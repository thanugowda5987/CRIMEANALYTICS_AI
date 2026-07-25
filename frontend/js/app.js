/*=========================================================
    KSP CRIME ANALYTICS AI
    APP.JS
    Dashboard + Home JavaScript
=========================================================*/

"use strict";

/*=========================================================
                API CONFIGURATION
=========================================================*/

const API_BASE_URL = "http://127.0.0.1:5000";

/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let crimeData = [];
let criminalData = [];
let victimData = [];

let crimeChart = null;
let pieChart = null;

let currentLanguage = "en";

/*=========================================================
                DOM ELEMENTS
=========================================================*/

const totalCrimeElement = document.getElementById("totalCrime");
const criminalCountElement = document.getElementById("criminalCount");
const victimCountElement = document.getElementById("victimCount");

const crimeTableBody = document.getElementById("crimeTableBody");

const languageButton = document.getElementById("languageBtn");

/*=========================================================
                LOADING SCREEN
=========================================================*/

function showLoading() {

    document.body.style.cursor = "wait";

}

function hideLoading() {

    document.body.style.cursor = "default";

}

/*=========================================================
                ERROR HANDLER
=========================================================*/

function showError(message) {

    console.error(message);

    alert(message);

}

/*=========================================================
                SAFE FETCH FUNCTION
=========================================================*/

async function fetchAPI(endpoint) {

    try {

        const response = await fetch(API_BASE_URL + endpoint);

        if (!response.ok) {

            throw new Error("Server Error : " + response.status);

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        throw error;

    }

}

/*=========================================================
                NUMBER FORMATTER
=========================================================*/

function formatNumber(number) {

    return new Intl.NumberFormat().format(number);

}

/*=========================================================
                UPDATE DASHBOARD CARD
=========================================================*/

function updateCard(element, value) {

    if (!element) return;

    element.innerHTML = formatNumber(value);

}

/*=========================================================
                TABLE ROW BUILDER
=========================================================*/

function createCrimeRow(crime) {

    return `

        <tr>

            <td>${crime.crime_id}</td>

            <td>${crime.crime_type}</td>

            <td>${crime.location}</td>

            <td>${crime.district}</td>

            <td>

                <span class="badge badge-open">

                    ${crime.status}

                </span>

            </td>

        </tr>

    `;

}
/*=========================================================
            LOAD ALL CRIMES
=========================================================*/

async function loadCrimes() {

    try {

        showLoading();

        crimeData = await fetchAPI("/crime");

        updateCard(totalCrimeElement, crimeData.length);

        renderCrimeTable();

    }

    catch (error) {

        showError("Unable to load Crime Records.");

    }

    finally {

        hideLoading();

    }

}


/*=========================================================
            LOAD CRIMINALS
=========================================================*/

async function loadCriminals() {

    try {

        criminalData = await fetchAPI("/api/criminals");

        updateCard(criminalCountElement, criminalData.length);

    }

    catch (error) {

        console.error(error);

    }

}


/*=========================================================
            LOAD VICTIMS
=========================================================*/

async function loadVictims() {

    try {

        victimData = await fetchAPI("/api/victims");

        updateCard(victimCountElement, victimData.length);

    }

    catch (error) {

        console.error(error);

    }

}


/*=========================================================
            LOAD DASHBOARD
=========================================================*/

async function loadDashboard() {

    await Promise.all([

        loadCrimes(),

        loadCriminals(),

        loadVictims()

    ]);

}


/*=========================================================
            DASHBOARD SUMMARY
=========================================================*/

function getCrimeStatusCount(status) {

    return crimeData.filter(

        crime => crime.status === status

    ).length;

}


function dashboardSummary() {

    console.log("================================");

    console.log("Crime Records :", crimeData.length);

    console.log("Criminals     :", criminalData.length);

    console.log("Victims       :", victimData.length);

    console.log("Solved Cases  :", getCrimeStatusCount("Solved"));

    console.log("Open Cases    :", getCrimeStatusCount("Open"));

    console.log("================================");

}
/*=========================================================
            RENDER CRIME TABLE
=========================================================*/

function renderCrimeTable() {

    if (!crimeTableBody) return;

    crimeTableBody.innerHTML = "";

    if (crimeData.length === 0) {

        crimeTableBody.innerHTML = `

            <tr>

                <td colspan="5" style="text-align:center;">

                    No Crime Records Found

                </td>

            </tr>

        `;

        return;

    }

    crimeData.forEach((crime) => {

        crimeTableBody.innerHTML += createCrimeRow(crime);

    });

}


/*=========================================================
            STATUS BADGE
=========================================================*/

function getStatusBadge(status) {

    switch (status.toLowerCase()) {

        case "solved":

            return '<span class="badge badge-green">Solved</span>';

        case "under investigation":

            return '<span class="badge badge-orange">Under Investigation</span>';

        case "closed":

            return '<span class="badge badge-blue">Closed</span>';

        default:

            return '<span class="badge badge-red">Open</span>';

    }

}


/*=========================================================
            REBUILD TABLE
=========================================================*/

function rebuildCrimeTable(list) {

    if (!crimeTableBody) return;

    crimeTableBody.innerHTML = "";

    if (list.length === 0) {

        crimeTableBody.innerHTML = `

        <tr>

            <td colspan="5">

                No Matching Records

            </td>

        </tr>

        `;

        return;

    }

    list.forEach((crime) => {

        crimeTableBody.innerHTML += `

        <tr>

            <td>${crime.crime_id}</td>

            <td>${crime.crime_type}</td>

            <td>${crime.location}</td>

            <td>${crime.district}</td>

            <td>${getStatusBadge(crime.status)}</td>

        </tr>

        `;

    });

}


/*=========================================================
            SEARCH FUNCTION
=========================================================*/

function searchCrime(keyword) {

    keyword = keyword.toLowerCase();

    const filtered = crimeData.filter(crime =>

        crime.crime_type.toLowerCase().includes(keyword) ||

        crime.location.toLowerCase().includes(keyword) ||

        crime.district.toLowerCase().includes(keyword) ||

        crime.status.toLowerCase().includes(keyword)

    );

    rebuildCrimeTable(filtered);

}


/*=========================================================
            SORT BY DISTRICT
=========================================================*/

function sortByDistrict() {

    crimeData.sort((a, b) =>

        a.district.localeCompare(b.district)

    );

    renderCrimeTable();

}


/*=========================================================
            SORT BY CRIME TYPE
=========================================================*/

function sortByCrimeType() {

    crimeData.sort((a, b) =>

        a.crime_type.localeCompare(b.crime_type)

    );

    renderCrimeTable();

}


/*=========================================================
            REFRESH TABLE
=========================================================*/

function refreshCrimeTable() {

    renderCrimeTable();

}
/*=========================================================
                CHART CONFIGURATION
=========================================================*/

function destroyCharts() {

    if (crimeChart) {

        crimeChart.destroy();

    }

    if (pieChart) {

        pieChart.destroy();

    }

}


/*=========================================================
                BAR CHART
=========================================================*/

function createCrimeChart() {

    const canvas = document.getElementById("crimeChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    crimeChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [

                "Theft",

                "Cyber",

                "Robbery",

                "Fraud",

                "Assault",

                "Others"

            ],

            datasets: [{

                label: "Crime Count",

                data: [

                    45,

                    28,

                    19,

                    32,

                    21,

                    15

                ],

                backgroundColor: [

                    "#1565C0",

                    "#2E7D32",

                    "#EF6C00",

                    "#C62828",

                    "#6A1B9A",

                    "#00838F"

                ],

                borderRadius: 10,

                borderWidth: 1

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}


/*=========================================================
                PIE CHART
=========================================================*/

function createPieChart() {

    const canvas = document.getElementById("pieChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    pieChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [

                "Solved",

                "Open",

                "Investigation"

            ],

            datasets: [{

                data: [

                    48,

                    30,

                    22

                ],

                backgroundColor: [

                    "#2E7D32",

                    "#D32F2F",

                    "#FB8C00"

                ],

                borderWidth: 2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


/*=========================================================
                UPDATE CHARTS
=========================================================*/

function updateCharts() {

    destroyCharts();

    createCrimeChart();

    createPieChart();

}


/*=========================================================
                ANALYTICS SUMMARY
=========================================================*/

function displayAnalytics() {

    console.log("========== ANALYTICS ==========");

    console.log("Total Crimes :", crimeData.length);

    console.log("Total Criminals :", criminalData.length);

    console.log("Total Victims :", victimData.length);

    console.log("===============================");

}
/*=========================================================
            ENGLISH ⇄ KANNADA TRANSLATION
=========================================================*/

const language = {

    en: {

        dashboard: "Crime Analytics Dashboard",

        subtitle: "AI Powered Decision Support System",

        overview: "Dashboard Overview",

        overviewSub: "Real-Time Karnataka State Police Crime Analytics",

        totalCrime: "Total Crimes",

        criminals: "Criminals",

        victims: "Victims",

        hotspots: "Crime Hotspots",

        recentCrime: "Recent Crime Records",

        monthlyTrend: "Monthly Crime Trend",

        crimeDistribution: "Crime Distribution"

    },

    kn: {

        dashboard: "ಅಪರಾಧ ವಿಶ್ಲೇಷಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

        subtitle: "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ",

        overview: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅವಲೋಕನ",

        overviewSub: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ನೈಜ ಸಮಯದ ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ",

        totalCrime: "ಒಟ್ಟು ಅಪರಾಧಗಳು",

        criminals: "ಅಪರಾಧಿಗಳು",

        victims: "ಬಾಧಿತರು",

        hotspots: "ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು",

        recentCrime: "ಇತ್ತೀಚಿನ ಅಪರಾಧ ದಾಖಲೆಗಳು",

        monthlyTrend: "ತಿಂಗಳವಾರು ಅಪರಾಧ ಪ್ರವೃತ್ತಿ",

        crimeDistribution: "ಅಪರಾಧ ವಿತರಣೆ"

    }

};


/*=========================================================
            APPLY LANGUAGE
=========================================================*/

function applyLanguage(lang) {

    const t = language[lang];

    if (!t) return;

    if (document.getElementById("dashboardHeading"))
        document.getElementById("dashboardHeading").textContent = t.dashboard;

    if (document.getElementById("dashboardSubHeading"))
        document.getElementById("dashboardSubHeading").textContent = t.subtitle;

    if (document.querySelector(".section-title"))
        document.querySelector(".section-title").textContent = t.overview;

    if (document.querySelector(".section-subtitle"))
        document.querySelector(".section-subtitle").textContent = t.overviewSub;

    if (document.querySelector(".blue h4"))
        document.querySelector(".blue h4").textContent = t.totalCrime;

    if (document.querySelector(".green h4"))
        document.querySelector(".green h4").textContent = t.criminals;

    if (document.querySelector(".orange h4"))
        document.querySelector(".orange h4").textContent = t.victims;

    if (document.querySelector(".red h4"))
        document.querySelector(".red h4").textContent = t.hotspots;

    const headings = document.querySelectorAll(".chart-card h3");

    if (headings.length >= 2) {

        headings[0].textContent = t.monthlyTrend;

        headings[1].textContent = t.crimeDistribution;

    }

    const tableTitle = document.querySelector(".table-title");

    if (tableTitle) {

        tableTitle.textContent = t.recentCrime;

    }

}


/*=========================================================
            TOGGLE LANGUAGE
=========================================================*/

function toggleLanguage() {

    currentLanguage = currentLanguage === "en" ? "kn" : "en";

    applyLanguage(currentLanguage);

    if (languageButton) {

        languageButton.textContent =
            currentLanguage === "en"
            ? "English"
            : "ಕನ್ನಡ";

    }

}


/*=========================================================
            LANGUAGE BUTTON EVENT
=========================================================*/

if (languageButton) {

    languageButton.addEventListener("click", toggleLanguage);

}


/*=========================================================
            DEFAULT LANGUAGE
=========================================================*/

applyLanguage("en");
/*=========================================================
            AUTO REFRESH
=========================================================*/

const REFRESH_INTERVAL = 30000; // 30 Seconds

function autoRefresh() {

    console.log("Refreshing Dashboard...");

    loadDashboard();

}


/*=========================================================
            UPDATE DASHBOARD
=========================================================*/

async function updateDashboard() {

    await loadDashboard();

    updateCharts();

    displayAnalytics();

    dashboardSummary();

}


/*=========================================================
            PAGE INITIALIZATION
=========================================================*/

async function initializeDashboard() {

    try {

        console.log("====================================");

        console.log("KSP Crime Analytics Dashboard");

        console.log("Initializing...");

        console.log("====================================");

        showLoading();

        await updateDashboard();

        hideLoading();

        console.log("Dashboard Loaded Successfully.");

    }

    catch (error) {

        hideLoading();

        console.error(error);

        showError("Unable to initialize dashboard.");

    }

}


/*=========================================================
            AUTO REFRESH TIMER
=========================================================*/

setInterval(() => {

    autoRefresh();

}, REFRESH_INTERVAL);


/*=========================================================
            PAGE LOADED
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});


/*=========================================================
            WINDOW EVENTS
=========================================================*/

window.addEventListener("focus", () => {

    autoRefresh();

});


window.addEventListener("online", () => {

    console.log("Internet Connected");

});


window.addEventListener("offline", () => {

    console.log("Internet Disconnected");

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
            END OF FILE
=========================================================*/

console.log("=======================================");

console.log("KSP Crime Analytics AI");

console.log("Frontend Version : 2.0");

console.log("Dashboard Ready");

console.log("=======================================");