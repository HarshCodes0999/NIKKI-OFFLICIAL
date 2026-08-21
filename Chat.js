import { auth } from "./Firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ===========================
   Login Check
=========================== */

onAuthStateChanged(auth, (user) => {

    if (!user) {

        location.href = "index.html";

    }

});

/* ===========================
   Elements
=========================== */

const chatBox = document.getElementById("chatBox");

const input = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

/* ===========================
   Send Message
=========================== */

function sendMessage(){

    const message = input.value.trim();

    if(message==="") return;

    const userDiv = document.createElement("div");

    userDiv.className="user-message";

    userDiv.textContent=message;

    chatBox.appendChild(userDiv);

    chatBox.scrollTop=chatBox.scrollHeight;

    input.value="";

    aiTyping(message);

}

/* ===========================
   AI Processing Placeholder
=========================== */

async function aiTyping(userMessage) {

    try {

        const response = await fetch(
            "http://localhost:3000/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: userMessage
                })
            }
        );

        const data = await response.json();

        if (!data.success) {

            console.error("[NIKKI]", data.response);

            return;

        }

        const aiDiv = document.createElement("div");

        aiDiv.className = "ai-message";

        aiDiv.textContent = data.response;

        chatBox.appendChild(aiDiv);

        chatBox.scrollTop = chatBox.scrollHeight;

    }

    catch (error) {

        console.error(
            "[NIKKI] Connection error:",
            error
        );

    }

}

/* ===========================
   Send Button
=========================== */

sendBtn.addEventListener("click", sendMessage);

/* ===========================
   Enter Key
=========================== */

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});
