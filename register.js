document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const registrationMessage = document.getElementById("registration-message");

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Check if the password and confirm password match
            if (password !== confirmPassword) {
                registrationMessage.textContent = "Passwords do not match.";
                return;
            }

            // Send a request to check if the email exists
            fetch("/check-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.exists) {
                    // Email already exists, show a message
                    registrationMessage.textContent = "You are already a user of our website.";
                } else {
                    // Email doesn't exist, proceed with registration
                    // Send registration data to the backend
                    fetch("/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, email, password }),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((registrationData) => {
                        // Handle the registration response from the server
                        if (registrationData.success) {
                            registrationMessage.textContent = "Registration successful.";
                        } else {
                            registrationMessage.textContent = "Registration failed. Please try again.";
                        }
                    })
                    .catch((error) => {
                        console.error("Registration Error:", error);
                        registrationMessage.textContent = "An error occurred during registration.";
                    });
                }
            })
            .catch((error) => {
                console.error("Check Email Error:", error);
                registrationMessage.textContent = "An error occurred during email check.";
            });
        });
    }
});
