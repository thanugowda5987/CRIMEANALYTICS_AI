const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// Press Enter to Send

userInput.addEventListener("keypress", function(event){

    if(event.key==="Enter"){

        sendMessage();

    }

});

// Send Message

async function sendMessage(){

    const message = userInput.value.trim();

    if(message==="") return;

    // User Bubble

    chatBox.innerHTML += `

    <div class="message user">

        ${message}

    </div>

    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    userInput.value="";

    try{

        const response = await fetch("http://127.0.0.1:5000/chat",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                message:message

            })

        });

        const data = await response.json();

        // AI Response

        chatBox.innerHTML += `

        <div class="message bot">

            ${data.reply}

        </div>

        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }

    catch(error){

        chatBox.innerHTML += `

        <div class="message bot">

            Unable to connect to backend server.

        </div>

        `;

        chatBox.scrollTop = chatBox.scrollHeight;

        console.log(error);

    }

}

// Clear Chat

function clearChat(){

    chatBox.innerHTML=`

    <div class="message bot">

        Chat cleared.<br><br>

        Ask me another crime-related question.

    </div>

    `;

}