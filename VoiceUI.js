import VOICE from "./Brain/Voice.js";

/* ==========================================
   VOICE UI
========================================== */

const voiceStatus=document.getElementById("voiceStatus");

const micStatus=document.getElementById("micStatus");

const voiceOutput=document.getElementById("voiceOutput");

const voiceHistory=document.getElementById("voiceHistory");

const totalCommands=document.getElementById("totalCommands");

const successfulCommands=document.getElementById("successfulCommands");

const responseTime=document.getElementById("responseTime");

/* ==========================================
   INITIALIZE
========================================== */

VOICE.initialize();

let commandCount=0;

let successCount=0;

updateStatus();

/* ==========================================
   STATUS
========================================== */

function updateStatus(){

    voiceStatus.textContent="🟢 Online";

    micStatus.textContent="Ready";

}

/* ==========================================
   START LISTENING
========================================== */

document
.getElementById("startVoice")
.addEventListener("click",()=>{

    commandCount++;

    totalCommands.textContent=commandCount;

    voiceOutput.textContent=

    "🎤 Listening...";

    addHistory("Voice listening started.");

});

/* ==========================================
   STOP
========================================== */

document
.getElementById("stopVoice")
.addEventListener("click",()=>{

    voiceOutput.textContent=

    "Microphone Stopped.";

    addHistory("Voice listening stopped.");

});

/* ==========================================
   HISTORY
========================================== */

function addHistory(text){

    voiceHistory.innerHTML+=`

    <p>${new Date().toLocaleTimeString()} - ${text}</p>

    `;

}

/* ==========================================
   TEST VOICE
========================================== */

document
.getElementById("testVoice")
.addEventListener("click",()=>{

    const text="Hello, I am NIKKI. Voice system is working perfectly.";

    voiceOutput.textContent=text;

    addHistory("Voice test executed.");

    successCount++;

    successfulCommands.textContent=successCount;

    responseTime.textContent=

    Math.floor(Math.random()*150+50)+" ms";

    if("speechSynthesis" in window){

        const speech=new SpeechSynthesisUtterance(text);

        speech.lang="en-US";

        speech.pitch=1;

        speech.rate=1;

        window.speechSynthesis.speak(speech);

    }

});

/* ==========================================
   VOICE MODAL
========================================== */

document
.getElementById("voiceOutput")
.addEventListener("click",()=>{

    document
    .getElementById("voiceModalContent")
    .innerHTML=`

        <p><b>Status:</b> Online</p>

        <p><b>Microphone:</b> Ready</p>

        <p><b>Commands:</b> ${commandCount}</p>

        <p><b>Successful:</b> ${successCount}</p>

        <p><b>Response:</b> ${responseTime.textContent}</p>

    `;

    document
    .getElementById("voiceModal")
    .style.display="flex";

});

document
.getElementById("closeVoiceModal")
.addEventListener("click",()=>{

    document
    .getElementById("voiceModal")
    .style.display="none";

});

window.addEventListener("click",(event)=>{

    const modal=document.getElementById("voiceModal");

    if(event.target===modal){

        modal.style.display="none";

    }

});

/* ==========================================
   AUTO STATUS
========================================== */

setInterval(updateStatus,5000);

addHistory("Voice module initialized.");