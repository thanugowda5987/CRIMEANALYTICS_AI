// Show / Hide Password

const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", function () {

    const password = document.getElementById("password");

    if (this.checked) {

        password.type = "text";

    } else {

        password.type = "password";

    }

});


// Login Form

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    message.style.color = "black";
    message.innerHTML = "Checking credentials...";

    try {

        // Replace localhost port if your Flask backend uses a different port
        const response = await fetch("http://127.0.0.1:5000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: username,

                password: password

            })

        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "green";

            message.innerHTML = "Login Successful";

            localStorage.setItem("username", username);

            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 1000);

        }

        else {

            message.style.color = "red";

            message.innerHTML = data.message || "Invalid Username or Password";

        }

    }

    catch (error) {

        message.style.color = "red";

        message.innerHTML = "Cannot connect to backend server.";

        console.error(error);

    }

});