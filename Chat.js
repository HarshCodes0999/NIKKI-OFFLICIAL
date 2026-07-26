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

function aiTyping(userMessage){

    console.log("User Message:", userMessage);

    // Future:
    // NIKKI Brain
    // Memory
    // OpenAI API
    // Voice
    // Vision
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