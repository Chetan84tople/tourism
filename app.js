// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Setup email transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// MongoDB models
const User = require('./models/User'); // Import User model

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// User Registration Route
app.post('/register', async(req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verificationToken,
    });

    await newUser.save();

    // Send verification email
    const verifyUrl = `http://localhost:${port}/verify-email?token=${verificationToken}&email=${email}`;
    const emailContent = `<p>Click the link to verify your email: <a href="${verifyUrl}">Verify Email</a></p>`;

    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: emailContent,
        });
        res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending verification email.' });
    }
});

// Email Verification Route
app.get('/verify-email', async(req, res) => {
    const { token, email } = req.query;

    const user = await User.findOne({ email, verificationToken: token });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = null; // Remove the verification token
    await user.save();

    res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
});

// User Login Route
app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: 'Please verify your email before logging in.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.status(200).json({ message: 'Login successful' });
});

// Password Reset Request Route
app.post('/request-password-reset', async(req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Store the reset token in the user document
    user.resetToken = resetToken;
    await user.save();

    // Send reset email
    const resetUrl = `http://localhost:${port}/reset-password?token=${resetToken}&email=${email}`;
    const emailContent = `<p>Click the link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`;

    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: emailContent,
        });
        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email.' });
    }
});

// Password Reset Route
app.post('/reset-password', async(req, res) => {
    const { token, email, newPassword } = req.body;

    const user = await User.findOne({ email, resetToken: token });
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    user.resetToken = null; // Remove the reset token
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
console.log(process.env.MONGO_URI); // Should output your MongoDB URI
console.log(process.env.JWT_SECRET); // Should output your JWT secret