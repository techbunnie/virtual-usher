import * as api from "/public/js/registration/api.js"
import * as models from "/public/js/models.js"


function checkinGuest(email) {
    let now = new Date(),
        guest;

    guest = new models.Guest();
    guest.email = email;
    guest.confirmedAt = null;
    guest.checkedinAt = now;
    guest.createdAt = now;

    guest = api.postRegistration(guest);

    console.log("Registered guest:", guest);
}

;!function main() {
    const emailInput = document.getElementById('userInput');
    const errorMessage = document.getElementById('error-message');

    document.getElementById('registration-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Validate the email address using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(emailInput.value);

      if (!isValidEmail) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.style.display = 'inline-block'; // Show the error message
        return;
      }

      // Clear the error message if the email is valid
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';

      // Perform additional actions here if needed
      checkinGuest(emailInput.value);

      // Redirect to the confirmation page
      window.location.href = 'confirmation.html';
    });
}();