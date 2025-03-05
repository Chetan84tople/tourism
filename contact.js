// Form Validation
function validateForm() {
    // Get the values from the form
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    // Check if the fields are empty
    if (name == "" || email == "" || phone == "" || message == "") {
        alert("Please fill in all fields.");
        return false;
    }

    // Additional email validation (optional)
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Success message
    document.getElementById("form-message").innerHTML = "Thank you for contacting us! We will get back to you soon.";
    return false; // Prevent the form from actually submitting (for demo purposes)
}