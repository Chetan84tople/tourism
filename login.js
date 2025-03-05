// Show Signup Form when "Sign up" is clicked
document.getElementById('show-signup').addEventListener('click', () => {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.signup-container').style.display = 'block';
});

// Show Login Form when "Log in" is clicked
document.getElementById('show-login').addEventListener('click', () => {
    document.querySelector('.signup-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
});

// Handle Login Form Submission
document.getElementById('login-form-id').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        // Simulate login by saving user data to localStorage (you should replace this with real authentication logic)
        localStorage.setItem('userLoggedIn', 'true'); // Mark user as logged in

        // Check if there's a URL to redirect to after login
        const redirectUrl = localStorage.getItem('redirectAfterLogin');

        if (redirectUrl) {
            // Redirect the user to the saved URL after login (for example, packages page)
            localStorage.removeItem('redirectAfterLogin');
            window.location.href = redirectUrl;
        } else {
            // If no URL is saved, redirect them to the packages page
            window.location.href = 'packages.html';
        }
    } else {
        alert('Please fill in both fields');
    }
});

// Handle Signup Form Submission
document.getElementById('signup-form-id').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (username && email && password) {
        alert('Signup successful');
        // Save user data and proceed to login page or log them in automatically
        // For example:
        localStorage.setItem('userLoggedIn', 'true'); // Automatically log in after signup
        window.location.href = 'packages.html'; // Redirect to the packages page
    } else {
        alert('Please fill in all fields');
    }
});