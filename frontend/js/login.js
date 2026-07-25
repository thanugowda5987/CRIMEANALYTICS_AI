/*=========================================================
            KSP CRIME ANALYTICS AI
                    LOGIN.JS
=========================================================*/

"use strict";

/*=========================================================
                    API URL
=========================================================*/

const API_BASE_URL = "http://127.0.0.1:5000";

/*=========================================================
                DOM ELEMENTS
=========================================================*/

const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const languageButton = document.getElementById("languageBtn");

const loginButton = document.querySelector(".login-btn");

/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let currentLanguage = "en";

/*=========================================================
                LOADING FUNCTIONS
=========================================================*/

function showLoading() {

    loginButton.disabled = true;

    loginButton.innerHTML = `

        <i class="fa-solid fa-spinner fa-spin"></i>

        Logging In...

    `;

}

function hideLoading() {

    loginButton.disabled = false;

    loginButton.innerHTML = "Login";

}

/*=========================================================
                VALIDATION
=========================================================*/

function validateLogin() {

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();

    if (username === "") {

        alert("Please enter Username");

        usernameInput.focus();

        return false;

    }

    if (password === "") {

        alert("Please enter Password");

        passwordInput.focus();

        return false;

    }

    if (password.length < 4) {

        alert("Password should contain at least 4 characters");

        return false;

    }

    return true;

}

/*=========================================================
                RESET FORM
=========================================================*/

function resetForm() {

    usernameInput.value = "";

    passwordInput.value = "";

}
/*=========================================================
                LOGIN API
=========================================================*/

async function loginUser(username, password) {

    try {

        showLoading();

        const response = await fetch(`${API_BASE_URL}/login`, {

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

        hideLoading();

        if (!response.ok) {

            throw new Error(data.message || "Login Failed");

        }

        return data;

    }

    catch (error) {

        hideLoading();

        console.error("Login Error:", error);

        alert(error.message || "Unable to connect to the server.");

        return null;

    }

}


/*=========================================================
            LOGIN FORM SUBMIT
=========================================================*/

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!validateLogin()) {

        return;

    }

    const username = usernameInput.value.trim();

    const password = passwordInput.value.trim();

    const result = await loginUser(username, password);

    if (!result) {

        return;

    }

    if (result.success === true) {

        // Save login session
        sessionStorage.setItem("loggedIn", "true");

        sessionStorage.setItem("username", username);

        if (result.role) {

            sessionStorage.setItem("role", result.role);

        }

        alert("✅ Login Successful");

        window.location.href = "dashboard.html";

    }

    else {

        alert(result.message || "Invalid Username or Password");

        passwordInput.value = "";

        passwordInput.focus();

    }

});


/*=========================================================
            ENTER KEY SUPPORT
=========================================================*/

passwordInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        loginForm.dispatchEvent(

            new Event("submit")

        );

    }

});


/*=========================================================
            PAGE LOAD
=========================================================*/

window.addEventListener("load", () => {

    usernameInput.focus();

});
/*=========================================================
            LANGUAGE TRANSLATIONS
=========================================================*/

const translations = {

    en: {

        title: "KSP Crime Analytics AI",

        subtitle: "Secure Login Portal",

        username: "Username",

        password: "Password",

        login: "Login",

        forgot: "Forgot Password?",

        remember: "Remember Me",

        welcome: "Welcome to Karnataka State Police",

        invalidUser: "Please enter Username",

        invalidPassword: "Please enter Password",

        shortPassword: "Password should contain at least 4 characters"

    },

    kn: {

        title: "ಕೆಎಸ್‌ಪಿ ಅಪರಾಧ ವಿಶ್ಲೇಷಣಾ AI",

        subtitle: "ಸುರಕ್ಷಿತ ಲಾಗಿನ್ ಪೋರ್ಟಲ್",

        username: "ಬಳಕೆದಾರ ಹೆಸರು",

        password: "ಪಾಸ್‌ವರ್ಡ್",

        login: "ಲಾಗಿನ್",

        forgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?",

        remember: "ನನ್ನನ್ನು ನೆನಪಿಡಿ",

        welcome: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್‌ಗೆ ಸ್ವಾಗತ",

        invalidUser: "ದಯವಿಟ್ಟು ಬಳಕೆದಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",

        invalidPassword: "ದಯವಿಟ್ಟು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",

        shortPassword: "ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 4 ಅಕ್ಷರಗಳಿರಬೇಕು"

    }

};


/*=========================================================
            APPLY LANGUAGE
=========================================================*/

function applyLanguage(lang) {

    currentLanguage = lang;

    const t = translations[lang];

    if (document.getElementById("pageTitle"))
        document.getElementById("pageTitle").textContent = t.title;

    if (document.getElementById("pageSubtitle"))
        document.getElementById("pageSubtitle").textContent = t.subtitle;

    if (document.getElementById("welcomeText"))
        document.getElementById("welcomeText").textContent = t.welcome;

    if (document.getElementById("usernameLabel"))
        document.getElementById("usernameLabel").textContent = t.username;

    if (document.getElementById("passwordLabel"))
        document.getElementById("passwordLabel").textContent = t.password;

    if (document.getElementById("rememberLabel"))
        document.getElementById("rememberLabel").textContent = t.remember;

    if (document.getElementById("forgotPassword"))
        document.getElementById("forgotPassword").textContent = t.forgot;

    if (loginButton)
        loginButton.textContent = t.login;

    if (languageButton) {

        languageButton.textContent =

            lang === "en"

            ? "ಕನ್ನಡ"

            : "English";

    }

}


/*=========================================================
            TOGGLE LANGUAGE
=========================================================*/

function toggleLanguage() {

    if (currentLanguage === "en") {

        applyLanguage("kn");

    }

    else {

        applyLanguage("en");

    }

}


/*=========================================================
            LANGUAGE BUTTON
=========================================================*/

if (languageButton) {

    languageButton.addEventListener(

        "click",

        toggleLanguage

    );

}


/*=========================================================
            DEFAULT LANGUAGE
=========================================================*/

applyLanguage("en");
/*=========================================================
            SHOW / HIDE PASSWORD
=========================================================*/

const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        }

        else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });

}


/*=========================================================
                REMEMBER ME
=========================================================*/

const rememberCheck = document.getElementById("rememberMe");


function saveLogin() {

    if (!rememberCheck) return;

    if (rememberCheck.checked) {

        localStorage.setItem(

            "rememberUsername",

            usernameInput.value

        );

        localStorage.setItem(

            "rememberChecked",

            "true"

        );

    }

    else {

        localStorage.removeItem("rememberUsername");

        localStorage.removeItem("rememberChecked");

    }

}


/*=========================================================
                LOAD SAVED LOGIN
=========================================================*/

function loadRememberedUser() {

    const rememberedUser =

        localStorage.getItem("rememberUsername");

    const rememberedChecked =

        localStorage.getItem("rememberChecked");

    if (rememberedUser) {

        usernameInput.value = rememberedUser;

    }

    if (

        rememberCheck &&

        rememberedChecked === "true"

    ) {

        rememberCheck.checked = true;

    }

}


/*=========================================================
            LOGIN SUCCESS
=========================================================*/

function loginSuccess(user) {

    saveLogin();

    sessionStorage.setItem("loggedIn", "true");

    sessionStorage.setItem("username", user.username);

    sessionStorage.setItem("role", user.role || "Officer");

    window.location.href = "dashboard.html";

}


/*=========================================================
            LOGIN FAILED
=========================================================*/

function loginFailed(message) {

    passwordInput.value = "";

    passwordInput.focus();

    alert(message);

}


/*=========================================================
            PAGE LOAD
=========================================================*/

window.addEventListener("DOMContentLoaded", () => {

    loadRememberedUser();

});
/*=========================================================
            LOGOUT FUNCTION
=========================================================*/

function logout() {

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");

    window.location.href = "login.html";

}


/*=========================================================
            CHECK USER SESSION
=========================================================*/

function checkSession() {

    const currentPage = window.location.pathname;

    if (currentPage.includes("dashboard.html")) {

        const loggedIn = sessionStorage.getItem("loggedIn");

        if (loggedIn !== "true") {

            alert("Please login first.");

            window.location.href = "login.html";

        }

    }

}


/*=========================================================
            NETWORK STATUS
=========================================================*/

window.addEventListener("online", () => {

    console.log("Connected to Internet");

});

window.addEventListener("offline", () => {

    alert("No Internet Connection");

});


/*=========================================================
            GLOBAL ERROR HANDLER
=========================================================*/

window.onerror = function (

    message,
    source,
    line,
    column,
    error

) {

    console.error("Application Error");

    console.error(message);
    console.error(source);
    console.error(line);
    console.error(column);
    console.error(error);

};


/*=========================================================
            INITIALIZE LOGIN PAGE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadRememberedUser();

    checkSession();

    console.log("==================================");
    console.log("KSP Crime Analytics AI");
    console.log("Secure Login Portal");
    console.log("Version : 2.0");
    console.log("==================================");

});


/*=========================================================
            END OF LOGIN.JS
=========================================================*/
