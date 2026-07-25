/*=========================================================
        KSP CRIME ANALYTICS AI
              CHATBOT.JS
=========================================================*/

"use strict";

/*=========================================================
                    API CONFIGURATION
=========================================================*/

const API_BASE_URL = "http://127.0.0.1:5000";

/*=========================================================
                DOM ELEMENTS
=========================================================*/

const chatContainer = document.getElementById("chatContainer");

const messageInput = document.getElementById("messageInput");

const sendButton = document.getElementById("sendBtn");

const clearButton = document.getElementById("clearBtn");

const voiceButton = document.getElementById("voiceBtn");

const downloadButton = document.getElementById("downloadBtn");

const languageButton = document.getElementById("languageBtn");

/*=========================================================
                GLOBAL VARIABLES
=========================================================*/

let currentLanguage = "en";

let chatHistory = [];

let isTyping = false;

/*=========================================================
                SAFE FETCH FUNCTION
=========================================================*/

async function fetchAPI(endpoint, bodyData = {}) {

    try {

        const response = await fetch(API_BASE_URL + endpoint, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(bodyData)

        });

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
                SCROLL TO BOTTOM
=========================================================*/

function scrollToBottom() {

    if (!chatContainer) return;

    chatContainer.scrollTop = chatContainer.scrollHeight;

}

/*=========================================================
                GET CURRENT TIME
=========================================================*/

function getCurrentTime() {

    return new Date().toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}

/*=========================================================
                SAVE CHAT HISTORY
=========================================================*/

function saveChat(sender, message) {

    chatHistory.push({

        sender,

        message,

        time: getCurrentTime()

    });

}

/*=========================================================
                SHOW TYPING
=========================================================*/

function showTyping() {

    isTyping = true;

    const typing = document.createElement("div");

    typing.className = "typing-indicator";

    typing.id = "typingIndicator";

    typing.innerHTML = `

        <div class="bot-message">

            <span></span>

            <span></span>

            <span></span>

        </div>

    `;

    chatContainer.appendChild(typing);

    scrollToBottom();

}

/*=========================================================
                HIDE TYPING
=========================================================*/

function hideTyping() {

    isTyping = false;

    const typing = document.getElementById("typingIndicator");

    if (typing) {

        typing.remove();

    }

}
/*=========================================================
                SEND USER MESSAGE
=========================================================*/

async function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") return;

    addUserMessage(message);

    saveChat("User", message);

    messageInput.value = "";

    showTyping();

    try {

        const response = await fetchAPI("/chat", {

            message: message,

            language: currentLanguage

        });

        hideTyping();

        const botReply = response.reply || "No response received.";

        addBotMessage(botReply);

        saveChat("AI", botReply);

    }

    catch (error) {

        hideTyping();

        addBotMessage(

            "❌ Unable to connect to AI Server."

        );

        console.error(error);

    }

}


/*=========================================================
                USER MESSAGE
=========================================================*/

function addUserMessage(message) {

    const div = document.createElement("div");

    div.className = "message user-message";

    div.innerHTML = `

        <div class="message-content">

            <p>${message}</p>

            <small>${getCurrentTime()}</small>

        </div>

    `;

    chatContainer.appendChild(div);

    scrollToBottom();

}


/*=========================================================
                BOT MESSAGE
=========================================================*/

function addBotMessage(message) {

    const div = document.createElement("div");

    div.className = "message bot-message";

    div.innerHTML = `

        <div class="message-content">

            <p>${message}</p>

            <small>${getCurrentTime()}</small>

        </div>

    `;

    chatContainer.appendChild(div);

    scrollToBottom();

}


/*=========================================================
                SEND BUTTON
=========================================================*/

if (sendButton) {

    sendButton.addEventListener(

        "click",

        sendMessage

    );

}


/*=========================================================
                ENTER KEY
=========================================================*/

if (messageInput) {

    messageInput.addEventListener(

        "keypress",

        function(event){

            if(event.key==="Enter"){

                event.preventDefault();

                sendMessage();

            }

        }

    );

}
/*=========================================================
            AI WELCOME MESSAGE
=========================================================*/

function showWelcomeMessage() {

    const welcome = currentLanguage === "en"

        ? "👋 Welcome to KSP Crime Analytics AI.\n\nI can help you with:\n\n• Crime Records\n• FIR Information\n• Criminal Details\n• Crime Prediction\n• Hotspot Analysis\n• Police Station Information"

        : "👋 ಕೆಎಸ್‌ಪಿ ಅಪರಾಧ ವಿಶ್ಲೇಷಣಾ AI ಗೆ ಸ್ವಾಗತ.\n\nನಾನು ಸಹಾಯ ಮಾಡಬಲ್ಲ ವಿಷಯಗಳು:\n\n• ಅಪರಾಧ ದಾಖಲೆಗಳು\n• FIR ಮಾಹಿತಿ\n• ಅಪರಾಧಿಗಳ ಮಾಹಿತಿ\n• ಅಪರಾಧ ಮುನ್ಸೂಚನೆ\n• ಹಾಟ್‌ಸ್ಪಾಟ್ ವಿಶ್ಲೇಷಣೆ\n• ಪೊಲೀಸ್ ಠಾಣೆ ಮಾಹಿತಿ";

    addBotMessage(welcome);

}


/*=========================================================
            TYPING ANIMATION
=========================================================*/

function simulateTyping(message) {

    hideTyping();

    const typingBox = document.createElement("div");

    typingBox.className = "message bot-message";

    const content = document.createElement("div");

    content.className = "message-content";

    const paragraph = document.createElement("p");

    const time = document.createElement("small");

    time.textContent = getCurrentTime();

    content.appendChild(paragraph);

    content.appendChild(time);

    typingBox.appendChild(content);

    chatContainer.appendChild(typingBox);

    scrollToBottom();

    let index = 0;

    const timer = setInterval(() => {

        paragraph.textContent += message.charAt(index);

        index++;

        scrollToBottom();

        if (index >= message.length) {

            clearInterval(timer);

        }

    }, 20);

}


/*=========================================================
            QUICK REPLY BUTTONS
=========================================================*/

function addQuickReplies() {

    const quickReplyContainer = document.getElementById("quickReplies");

    if (!quickReplyContainer) return;

    const replies = [

        "Show Crimes",

        "Crime Prediction",

        "Hotspots",

        "Police Stations"

    ];

    quickReplyContainer.innerHTML = "";

    replies.forEach(reply => {

        const btn = document.createElement("button");

        btn.className = "quick-btn";

        btn.textContent = reply;

        btn.onclick = () => {

            messageInput.value = reply;

            sendMessage();

        };

        quickReplyContainer.appendChild(btn);

    });

}


/*=========================================================
            AUTO SCROLL
=========================================================*/

const observer = new MutationObserver(() => {

    scrollToBottom();

});

if (chatContainer) {

    observer.observe(chatContainer, {

        childList: true,

        subtree: true

    });

}


/*=========================================================
            CLEAR INPUT AFTER SEND
=========================================================*/

function clearInput() {

    if (messageInput) {

        messageInput.value = "";

        messageInput.focus();

    }

}


/*=========================================================
            CHAT INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    showWelcomeMessage();

    addQuickReplies();

    clearInput();

});
/*=========================================================
            SPEECH RECOGNITION
=========================================================*/

const SpeechRecognition =

    window.SpeechRecognition ||

    window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-IN";

}


/*=========================================================
            START VOICE INPUT
=========================================================*/

function startVoiceRecognition() {

    if (!recognition) {

        alert("Speech Recognition is not supported in this browser.");

        return;

    }

    voiceButton.innerHTML =

        '<i class="fa-solid fa-microphone-lines"></i>';

    voiceButton.classList.add("recording");

    recognition.start();

}


/*=========================================================
            STOP VOICE INPUT
=========================================================*/

function stopVoiceRecognition() {

    if (!recognition) return;

    recognition.stop();

    voiceButton.innerHTML =

        '<i class="fa-solid fa-microphone"></i>';

    voiceButton.classList.remove("recording");

}


/*=========================================================
            SPEECH EVENTS
=========================================================*/

if (recognition) {

    recognition.onstart = () => {

        console.log("Listening...");

    };

    recognition.onresult = (event) => {

        const transcript =

            event.results[0][0].transcript;

        messageInput.value = transcript;

        sendMessage();

    };

    recognition.onerror = (event) => {

        console.error(event.error);

        stopVoiceRecognition();

    };

    recognition.onend = () => {

        stopVoiceRecognition();

    };

}


/*=========================================================
            VOICE BUTTON
=========================================================*/

if (voiceButton) {

    voiceButton.addEventListener(

        "click",

        startVoiceRecognition

    );

}


/*=========================================================
            TEXT TO SPEECH
=========================================================*/

function speak(text) {

    if (!("speechSynthesis" in window)) {

        return;

    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speech.lang =

        currentLanguage === "kn"

        ? "kn-IN"

        : "en-IN";

    window.speechSynthesis.speak(speech);

}


/*=========================================================
            SPEAK BOT RESPONSE
=========================================================*/

function speakLatestMessage() {

    const messages =

        document.querySelectorAll(".bot-message p");

    if (messages.length === 0) return;

    const latest =

        messages[messages.length - 1].innerText;

    speak(latest);

}


/*=========================================================
            AUTO SPEAK RESPONSE
=========================================================*/

const originalBotMessage = addBotMessage;

addBotMessage = function(message){

    originalBotMessage(message);

    speak(message);

};


/*=========================================================
            VOICE LANGUAGE
=========================================================*/

function updateVoiceLanguage() {

    if (!recognition) return;

    recognition.lang =

        currentLanguage === "kn"

        ? "kn-IN"

        : "en-IN";

}
/*=========================================================
            CLEAR CHAT
=========================================================*/

function clearChat() {

    if (!chatContainer) return;

    if (confirm("Clear all chat messages?")) {

        chatContainer.innerHTML = "";

        chatHistory = [];

        localStorage.removeItem("chatHistory");

        showWelcomeMessage();

        addQuickReplies();

    }

}


/*=========================================================
            CLEAR BUTTON
=========================================================*/

if (clearButton) {

    clearButton.addEventListener("click", clearChat);

}


/*=========================================================
            SAVE CHAT HISTORY
=========================================================*/

function saveChatHistory() {

    localStorage.setItem(

        "chatHistory",

        JSON.stringify(chatHistory)

    );

}


/*=========================================================
            LOAD CHAT HISTORY
=========================================================*/

function loadChatHistory() {

    const history = localStorage.getItem("chatHistory");

    if (!history) return;

    chatHistory = JSON.parse(history);

    chatContainer.innerHTML = "";

    chatHistory.forEach(chat => {

        if (chat.sender === "User") {

            addUserMessage(chat.message);

        }

        else {

            addBotMessage(chat.message);

        }

    });

}


/*=========================================================
            UPDATE CHAT STORAGE
=========================================================*/

const originalSaveChat = saveChat;

saveChat = function(sender, message) {

    originalSaveChat(sender, message);

    saveChatHistory();

};


/*=========================================================
            DOWNLOAD CHAT
=========================================================*/

function downloadChat() {

    if (chatHistory.length === 0) {

        alert("No chat history available.");

        return;

    }

    let text =

"=====================================\n" +

"KSP Crime Analytics AI Chat History\n" +

"=====================================\n\n";

    chatHistory.forEach(chat => {

        text +=

`[${chat.time}] ${chat.sender}\n`;

        text += chat.message + "\n\n";

    });

    const blob = new Blob(

        [text],

        { type: "text/plain" }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download =

        "KSP_Chat_History.txt";

    link.click();

}


/*=========================================================
            DOWNLOAD BUTTON
=========================================================*/

if (downloadButton) {

    downloadButton.addEventListener(

        "click",

        downloadChat

    );

}


/*=========================================================
            SEARCH CHAT
=========================================================*/

function searchChat(keyword) {

    keyword = keyword.toLowerCase();

    const messages =

        document.querySelectorAll(".message");

    messages.forEach(msg => {

        const text =

            msg.innerText.toLowerCase();

        if (text.includes(keyword)) {

            msg.style.display = "";

        }

        else {

            msg.style.display = "none";

        }

    });

}


/*=========================================================
            RESTORE CHAT
=========================================================*/

window.addEventListener("load", () => {

    loadChatHistory();

});


/*=========================================================
            AUTO SAVE
=========================================================*/

window.addEventListener(

    "beforeunload",

    saveChatHistory

);
/*=========================================================
        KSP CRIME ANALYTICS AI
        FINAL INITIALIZATION
=========================================================*/

"use strict";

/*=========================================================
                LANGUAGE TRANSLATIONS
=========================================================*/

const chatbotLanguage = {

    en: {

        placeholder: "Type your message here...",

        send: "Send",

        clear: "Clear Chat",

        download: "Download",

        voice: "Voice",

        welcome:
        "👋 Welcome to KSP Crime Analytics AI.\nHow can I assist you today?"

    },

    kn: {

        placeholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",

        send: "ಕಳುಹಿಸಿ",

        clear: "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",

        download: "ಡೌನ್‌ಲೋಡ್",

        voice: "ಧ್ವನಿ",

        welcome:
        "👋 ಕೆಎಸ್‌ಪಿ ಅಪರಾಧ ವಿಶ್ಲೇಷಣಾ AI ಗೆ ಸ್ವಾಗತ.\nಇಂದು ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"

    }

};


/*=========================================================
            APPLY LANGUAGE
=========================================================*/

function applyChatLanguage(lang) {

    currentLanguage = lang;

    const t = chatbotLanguage[lang];

    if (messageInput)
        messageInput.placeholder = t.placeholder;

    if (sendButton)
        sendButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> ' + t.send;

    if (clearButton)
        clearButton.innerHTML =
            '<i class="fa-solid fa-trash"></i> ' + t.clear;

    if (downloadButton)
        downloadButton.innerHTML =
            '<i class="fa-solid fa-download"></i> ' + t.download;

    if (voiceButton)
        voiceButton.title = t.voice;

    updateVoiceLanguage();

}


/*=========================================================
            LANGUAGE BUTTON
=========================================================*/

if (languageButton) {

    languageButton.addEventListener("click", () => {

        currentLanguage =

            currentLanguage === "en"

            ? "kn"

            : "en";

        applyChatLanguage(currentLanguage);

    });

}


/*=========================================================
            NOTIFICATION SOUND
=========================================================*/

function playNotification() {

    const audio = new Audio(

        "https://actions.google.com/sounds/v1/cartoon/pop.ogg"

    );

    audio.volume = 0.4;

    audio.play().catch(() => {});

}


/*=========================================================
        OVERRIDE BOT MESSAGE
=========================================================*/

const oldBotMessage = addBotMessage;

addBotMessage = function(message) {

    oldBotMessage(message);

    playNotification();

};


/*=========================================================
            AUTO SCROLL
=========================================================*/

function smoothScroll() {

    if (!chatContainer) return;

    chatContainer.scroll({

        top: chatContainer.scrollHeight,

        behavior: "smooth"

    });

}

setInterval(smoothScroll, 1000);


/*=========================================================
            INITIALIZE CHATBOT
=========================================================*/

function initializeChatbot() {

    applyChatLanguage("en");

    console.log("================================");

    console.log("KSP Crime Analytics AI");

    console.log("AI Chatbot Ready");

    console.log("Version 2.0");

    console.log("================================");

}

document.addEventListener(

    "DOMContentLoaded",

    initializeChatbot

);


/*=========================================================
            GLOBAL ERROR HANDLER
=========================================================*/

window.onerror = function(

    message,

    source,

    line,

    column,

    error

){

    console.error("Chatbot Error");

    console.error(message);

    console.error(source);

    console.error(line);

    console.error(column);

    console.error(error);

};


/*=========================================================
                END OF FILE
=========================================================*/

console.log("Chatbot.js Loaded Successfully");