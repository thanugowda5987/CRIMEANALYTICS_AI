/*=========================================================
        KSP CRIME ANALYTICS AI
            PREDICTION.JS
=========================================================*/

"use strict";

/*=========================================================
                API CONFIGURATION
=========================================================*/

const API_BASE_URL = "http://127.0.0.1:5000";

/*=========================================================
                DOM ELEMENTS
=========================================================*/

const predictionForm = document.getElementById("predictionForm");

const district = document.getElementById("district");

const crimeType = document.getElementById("crimeType");

const predictBtn = document.getElementById("predictBtn");

const resultCard = document.getElementById("predictionResult");

const riskLevel = document.getElementById("riskLevel");

const confidence = document.getElementById("confidence");

const recommendation = document.getElementById("recommendation");

const languageButton = document.getElementById("languageBtn");

/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let currentLanguage = "en";

let latestPrediction = null;

/*=========================================================
                SHOW LOADING
=========================================================*/

function showLoading(){

    predictBtn.disabled = true;

    predictBtn.innerHTML =

    `<i class="fa fa-spinner fa-spin"></i> Predicting...`;

}

/*=========================================================
                HIDE LOADING
=========================================================*/

function hideLoading(){

    predictBtn.disabled = false;

    predictBtn.innerHTML =

    `<i class="fa fa-brain"></i> Predict Crime`;

}

/*=========================================================
                ERROR MESSAGE
=========================================================*/

function showError(message){

    alert(message);

}

/*=========================================================
                RESET RESULT
=========================================================*/

function clearPrediction(){

    if(resultCard){

        resultCard.style.display="none";

    }

}

/*=========================================================
                VALIDATE FORM
=========================================================*/

function validatePrediction(){

    if(district.value===""){

        alert("Please Select District");

        district.focus();

        return false;

    }

    if(crimeType.value===""){

        alert("Please Select Crime Type");

        crimeType.focus();

        return false;

    }

    return true;

}
/*=========================================================
                PREDICTION API
=========================================================*/

async function predictCrime() {

    if (!validatePrediction()) {

        return;

    }

    showLoading();

    const requestData = {

        district: district.value,

        crime_type: crimeType.value

    };

    try {

        const response = await fetch(

            `${API_BASE_URL}/prediction`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(requestData)

            }

        );

        const data = await response.json();

        hideLoading();

        if (!response.ok) {

            throw new Error(

                data.message || "Prediction Failed"

            );

        }

        latestPrediction = data;

        displayPrediction(data);

    }

    catch (error) {

        hideLoading();

        console.error(error);

        showError(

            error.message ||

            "Unable to connect to Prediction Server."

        );

    }

}


/*=========================================================
            FORM SUBMIT
=========================================================*/

if (predictionForm) {

    predictionForm.addEventListener(

        "submit",

        function(event){

            event.preventDefault();

            predictCrime();

        }

    );

}


/*=========================================================
            BUTTON CLICK
=========================================================*/

if (predictBtn) {

    predictBtn.addEventListener(

        "click",

        function(){

            predictCrime();

        }

    );

}


/*=========================================================
            ENTER KEY SUPPORT
=========================================================*/

document.addEventListener(

    "keypress",

    function(event){

        if(event.key==="Enter"){

            if(predictionForm){

                event.preventDefault();

                predictCrime();

            }

        }

    }

);


/*=========================================================
            CONNECTION TEST
=========================================================*/

async function checkPredictionAPI() {

    try {

        const response = await fetch(

            `${API_BASE_URL}/prediction`

        );

        console.log(

            "Prediction API Connected:",

            response.status

        );

    }

    catch (error) {

        console.log(

            "Prediction API Offline"

        );

    }

}

window.addEventListener(

    "load",

    checkPredictionAPI

);
/*=========================================================
            DISPLAY PREDICTION RESULT
=========================================================*/

function displayPrediction(data) {

    if (!resultCard) return;

    resultCard.style.display = "block";

    // Prediction
    const predictionText = document.getElementById("predictionText");

    if (predictionText) {

        predictionText.textContent =
            data.prediction || "Prediction Not Available";

    }

    // Risk Level
    if (riskLevel) {

        riskLevel.textContent =
            data.risk_level || "Unknown";

        riskLevel.className = "";

        switch ((data.risk_level || "").toLowerCase()) {

            case "high":

                riskLevel.classList.add("risk-high");

                break;

            case "medium":

                riskLevel.classList.add("risk-medium");

                break;

            case "low":

                riskLevel.classList.add("risk-low");

                break;

            default:

                riskLevel.classList.add("risk-normal");

        }

    }

    // Confidence

    if (confidence) {

        confidence.textContent =
            (data.confidence || 0) + "%";

    }

    // Recommendation

    if (recommendation) {

        recommendation.textContent =
            data.recommendation ||
            "No recommendation available.";

    }

    // Last Updated

    const updated = document.getElementById("lastUpdated");

    if (updated) {

        updated.textContent =
            new Date().toLocaleString();

    }

}


/*=========================================================
            RISK COLOR
=========================================================*/

function getRiskColor(level){

    switch((level || "").toLowerCase()){

        case "high":

            return "#dc3545";

        case "medium":

            return "#ffc107";

        case "low":

            return "#198754";

        default:

            return "#0d6efd";

    }

}


/*=========================================================
            UPDATE RESULT BORDER
=========================================================*/

function updateRiskBorder(level){

    if(!resultCard) return;

    resultCard.style.borderLeft =
        "8px solid " + getRiskColor(level);

}


/*=========================================================
            ANIMATE RESULT CARD
=========================================================*/

function animateResult(){

    if(!resultCard) return;

    resultCard.classList.add("prediction-show");

    setTimeout(()=>{

        resultCard.classList.remove("prediction-show");

    },600);

}


/*=========================================================
            ENHANCED DISPLAY
=========================================================*/

const oldDisplayPrediction = displayPrediction;

displayPrediction = function(data){

    oldDisplayPrediction(data);

    updateRiskBorder(data.risk_level);

    animateResult();

};


/*=========================================================
            DOWNLOAD SUMMARY
=========================================================*/

function downloadPrediction(){

    if(!latestPrediction){

        alert("No prediction available.");

        return;

    }

    const report =

`KSP Crime Analytics AI

District : ${district.value}

Crime Type : ${crimeType.value}

Prediction : ${latestPrediction.prediction}

Risk Level : ${latestPrediction.risk_level}

Confidence : ${latestPrediction.confidence}%

Recommendation :

${latestPrediction.recommendation}

Generated :

${new Date().toLocaleString()}
`;

    const blob = new Blob(

        [report],

        {

            type:"text/plain"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download =

        "Prediction_Report.txt";

    link.click();

}
/*=========================================================
            CHART VARIABLES
=========================================================*/

let riskChart = null;

let confidenceChart = null;


/*=========================================================
            CREATE RISK CHART
=========================================================*/

function createRiskChart(riskLevelValue) {

    const canvas = document.getElementById("riskChart");

    if (!canvas) return;

    if (riskChart) {

        riskChart.destroy();

    }

    let value = 0;

    switch ((riskLevelValue || "").toLowerCase()) {

        case "high":
            value = 90;
            break;

        case "medium":
            value = 60;
            break;

        case "low":
            value = 30;
            break;

        default:
            value = 50;
    }

    riskChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Risk",

                "Remaining"

            ],

            datasets: [{

                data: [

                    value,

                    100 - value

                ],

                backgroundColor: [

                    getRiskColor(riskLevelValue),

                    "#E9ECEF"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            cutout: "70%",

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}


/*=========================================================
            CONFIDENCE CHART
=========================================================*/

function createConfidenceChart(confidenceValue) {

    const canvas = document.getElementById("confidenceChart");

    if (!canvas) return;

    if (confidenceChart) {

        confidenceChart.destroy();

    }

    confidenceChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: ["Confidence"],

            datasets: [{

                label: "Prediction Accuracy",

                data: [

                    confidenceValue || 0

                ]

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true,

                    max: 100

                }

            }

        }

    });

}


/*=========================================================
            UPDATE ANALYTICS
=========================================================*/

function updateAnalytics(data) {

    createRiskChart(

        data.risk_level

    );

    createConfidenceChart(

        data.confidence

    );

}


/*=========================================================
            OVERRIDE DISPLAY
=========================================================*/

const previousDisplayPrediction = displayPrediction;

displayPrediction = function(data) {

    previousDisplayPrediction(data);

    updateAnalytics(data);

};


/*=========================================================
            REFRESH CHARTS
=========================================================*/

function refreshPredictionCharts() {

    if (!latestPrediction) return;

    updateAnalytics(latestPrediction);

}


/*=========================================================
            WINDOW RESIZE
=========================================================*/

window.addEventListener(

    "resize",

    refreshPredictionCharts

);
/*=========================================================
                LANGUAGE DATA
=========================================================*/

const predictionLanguage = {

    en: {

        pageTitle: "Crime Prediction",

        predict: "Predict Crime",

        reset: "Reset",

        district: "District",

        crimeType: "Crime Type",

        prediction: "Prediction",

        risk: "Risk Level",

        confidence: "Confidence",

        recommendation: "Recommendation",

        selectDistrict: "Please select a district.",

        selectCrime: "Please select a crime type."

    },

    kn: {

        pageTitle: "ಅಪರಾಧ ಮುನ್ಸೂಚನೆ",

        predict: "ಅಪರಾಧ ಮುನ್ಸೂಚನೆ",

        reset: "ಮರುಹೊಂದಿಸಿ",

        district: "ಜಿಲ್ಲೆ",

        crimeType: "ಅಪರಾಧದ ಪ್ರಕಾರ",

        prediction: "ಮುನ್ಸೂಚನೆ",

        risk: "ಅಪಾಯದ ಮಟ್ಟ",

        confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆ",

        recommendation: "ಶಿಫಾರಸು",

        selectDistrict: "ದಯವಿಟ್ಟು ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

        selectCrime: "ದಯವಿಟ್ಟು ಅಪರಾಧದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ."

    }

};


/*=========================================================
            APPLY LANGUAGE
=========================================================*/

function applyPredictionLanguage(lang) {

    currentLanguage = lang;

    const t = predictionLanguage[lang];

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) pageTitle.textContent = t.pageTitle;

    const districtLabel = document.getElementById("districtLabel");
    if (districtLabel) districtLabel.textContent = t.district;

    const crimeLabel = document.getElementById("crimeTypeLabel");
    if (crimeLabel) crimeLabel.textContent = t.crimeType;

    if (predictBtn)
        predictBtn.innerHTML =
        `<i class="fa-solid fa-brain"></i> ${t.predict}`;

    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn)
        resetBtn.innerHTML =
        `<i class="fa-solid fa-rotate-left"></i> ${t.reset}`;

}


/*=========================================================
            LANGUAGE SWITCH
=========================================================*/

if(languageButton){

    languageButton.addEventListener("click",function(){

        currentLanguage =

        currentLanguage==="en"

        ? "kn"

        : "en";

        applyPredictionLanguage(currentLanguage);

    });

}


/*=========================================================
            RESET FORM
=========================================================*/

function resetPredictionForm(){

    if(predictionForm){

        predictionForm.reset();

    }

    clearPrediction();

    latestPrediction = null;

}


/*=========================================================
            RESET BUTTON
=========================================================*/

const resetBtn = document.getElementById("resetBtn");

if(resetBtn){

    resetBtn.addEventListener(

        "click",

        resetPredictionForm

    );

}


/*=========================================================
            VALIDATION MESSAGE
=========================================================*/

const oldValidatePrediction = validatePrediction;

validatePrediction = function(){

    const t = predictionLanguage[currentLanguage];

    if(district.value===""){

        alert(t.selectDistrict);

        district.focus();

        return false;

    }

    if(crimeType.value===""){

        alert(t.selectCrime);

        crimeType.focus();

        return false;

    }

    return true;

};


/*=========================================================
            DEFAULT LANGUAGE
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        applyPredictionLanguage("en");

    }

);
/*=========================================================
        KSP CRIME ANALYTICS AI
        PREDICTION.JS FINAL
=========================================================*/

"use strict";

/*=========================================================
            PREDICTION HISTORY
=========================================================*/

let predictionHistory = JSON.parse(

    localStorage.getItem("predictionHistory")

) || [];


/*=========================================================
            SAVE PREDICTION
=========================================================*/

function savePredictionHistory(data){

    const record={

        district:district.value,

        crimeType:crimeType.value,

        prediction:data.prediction,

        risk:data.risk_level,

        confidence:data.confidence,

        recommendation:data.recommendation,

        date:new Date().toLocaleString()

    };

    predictionHistory.unshift(record);

    if(predictionHistory.length>20){

        predictionHistory.pop();

    }

    localStorage.setItem(

        "predictionHistory",

        JSON.stringify(predictionHistory)

    );

}


/*=========================================================
            DISPLAY HISTORY
=========================================================*/

function loadPredictionHistory(){

    const table=document.getElementById(

        "predictionHistoryTable"

    );

    if(!table) return;

    table.innerHTML="";

    predictionHistory.forEach(item=>{

        table.innerHTML+=`

<tr>

<td>${item.date}</td>

<td>${item.district}</td>

<td>${item.crimeType}</td>

<td>${item.prediction}</td>

<td>${item.risk}</td>

<td>${item.confidence}%</td>

</tr>

`;

    });

}


/*=========================================================
            EXPORT HISTORY
=========================================================*/

function exportPredictionHistory(){

    if(predictionHistory.length===0){

        alert("No prediction history available.");

        return;

    }

    let report="KSP Crime Analytics AI\n\n";

    predictionHistory.forEach(item=>{

        report+=

`Date : ${item.date}

District : ${item.district}

Crime Type : ${item.crimeType}

Prediction : ${item.prediction}

Risk : ${item.risk}

Confidence : ${item.confidence}%

Recommendation : ${item.recommendation}

--------------------------------------------

`;

    });

    const blob=new Blob(

        [report],

        {type:"text/plain"}

    );

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="Prediction_History.txt";

    link.click();

}


/*=========================================================
            OVERRIDE DISPLAY
=========================================================*/

const previousPredictionDisplay=

displayPrediction;

displayPrediction=function(data){

    previousPredictionDisplay(data);

    savePredictionHistory(data);

    loadPredictionHistory();

};


/*=========================================================
            AUTO REFRESH
=========================================================*/

function refreshPrediction(){

    if(latestPrediction){

        displayPrediction(latestPrediction);

    }

}


/*=========================================================
            CONNECTION STATUS
=========================================================*/

window.addEventListener(

    "online",

    ()=>{

        console.log(

            "Prediction Server Online"

        );

    }

);

window.addEventListener(

    "offline",

    ()=>{

        alert(

            "Internet Connection Lost"

        );

    }

);


/*=========================================================
            GLOBAL ERROR HANDLER
=========================================================*/

window.onerror=function(

    message,

    source,

    line,

    column,

    error

){

    console.error(

        "Prediction Error"

    );

    console.error(message);

    console.error(source);

    console.error(line);

    console.error(column);

    console.error(error);

};


/*=========================================================
            INITIALIZATION
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadPredictionHistory();

        console.log("================================");

        console.log("KSP Crime Analytics AI");

        console.log("Prediction Module Ready");

        console.log("Version : 2.0");

        console.log("================================");

    }

);


/*=========================================================
            AUTO REFRESH EVERY 60 SECONDS
=========================================================*/

setInterval(

    refreshPrediction,

    60000

);


/*=========================================================
            END OF FILE
=========================================================*/

console.log(

    "Prediction.js Loaded Successfully"

);
