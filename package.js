// Function to open the booking modal with the selected package details
function openBookingForm(packageName, packagePrice) {
    // Set the package name and price in the booking form
    document.getElementById('package-name').value = packageName;
    document.getElementById('price').value = packagePrice;

    // Display the booking modal
    document.getElementById('booking-modal').style.display = 'flex';
}

// Function to close the booking modal
function closeBookingForm() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Handle the booking form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for now

    // Collect the data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const packageName = document.getElementById('package-name').value;
    const price = document.getElementById('price').value;

    // Simple form validation
    if (!name || !email || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    // Show a confirmation message
    document.getElementById('booking-message').textContent = `Thank you, ${name}! Your booking for the "${packageName}" package has been confirmed.`;
    document.getElementById('booking-form').reset();

    // You can save the booking data to a backend here
    setTimeout(() => {
        // Close the modal after a short delay
        closeBookingForm();
    }, 3000);
});