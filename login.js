document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");
    const loginMessage = document.getElementById("login-message");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Make an AJAX request to check if the email exists
            fetch('/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    const loginData = { email, password };
                    fetch('/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginData),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                    .then((loginResult) => {
                        if (loginResult.success) {
                            // Login successful
                            loginMessage.textContent = 'Login successful.';
                        } else {
                            // Login failed, show an error message
                            loginMessage.textContent = 'Login failed. Please check your credentials.';
                        }
                    })
                    .catch((loginError) => {
                        console.error('Login Error:', loginError);
                        loginMessage.textContent = 'An error occurred during login.';
                    });
                } else {
                    // Email doesn't exist, show a message
                    loginMessage.textContent = 'You are not a registered user. Please register first.';
                    // Allow the form to submit normally
                    loginForm.submit();
                }
            })
            .catch((error) => {
                console.error('Check Email Error:', error);
                loginMessage.textContent = 'An error occurred during email verification.';
            });
        });
    }
});
