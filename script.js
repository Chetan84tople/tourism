// Smooth Scroll for Navigation Links
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        // Scroll to the target section
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Booking Button Click Handler (Example)
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert("Thank you for booking! We will contact you soon.");
    });
});

// Form Validation (Contact Us)
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;

    // Simple validation
    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = 'red';
    } else {
        formMessage.textContent = 'Thank you for reaching out! We will get back to you soon.';
        formMessage.style.color = 'green';

        // Optionally, you can reset the form after submission.
        contactForm.reset();
    }
});

// Show/Hide "Back to Top" Button on Scroll
const backToTopBtn = document.createElement('button');
backToTopBtn.textContent = "Back to Top";
backToTopBtn.style.position = "fixed";
backToTopBtn.style.bottom = "20px";
backToTopBtn.style.right = "20px";
backToTopBtn.style.padding = "10px 20px";
backToTopBtn.style.display = "none";
backToTopBtn.style.border = "none";
backToTopBtn.style.backgroundColor = "#ff6600";
backToTopBtn.style.color = "white";
backToTopBtn.style.fontSize = "16px";
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to Top Button Action
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});