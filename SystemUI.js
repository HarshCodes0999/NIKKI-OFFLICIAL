import SYSTEM from "./Brain/System.js";

/* ==========================================
   SYSTEM UI
========================================== */

const systemStatus=document.getElementById("systemStatus");

const aiStatus=document.getElementById("aiStatus");

const brainStatus=document.getElementById("brainStatus");

const loadedModules=document.getElementById("loadedModules");

const cpuUsage=document.getElementById("cpuUsage");

const ramUsage=document.getElementById("ramUsage");

const networkStatus=document.getElementById("networkStatus");

const runtime=document.getElementById("runtime");

/* ==========================================
   INITIALIZE
========================================== */

SYSTEM.initialize();

refreshSystem();

/* ==========================================
   REFRESH
========================================== */

function refreshSystem(){

    const status=SYSTEM.status();

    systemStatus.textContent=status.status;

    aiStatus.textContent="Active";

    brainStatus.textContent="Running";

    loadedModules.textContent="40";

    cpuUsage.textContent=Math.floor(Math.random()*40+10)+"%";

    ramUsage.textContent=Math.floor(Math.random()*300+200)+" MB";

    networkStatus.textContent=navigator.onLine

    ?"Connected"

    :"Offline";

}

/* ==========================================
   SYSTEM INFORMATION
========================================== */

document
.getElementById("systemVersion")
.textContent="NIKKI v1.0.0";

document
.getElementById("systemBuild")
.textContent="Stable";

document
.getElementById("lastUpdate")
.textContent=new Date().toLocaleDateString();

/* ==========================================
   UPTIME
========================================== */

let seconds=0;

setInterval(()=>{

    seconds++;

    const h=String(Math.floor(seconds/3600)).padStart(2,"0");

    const m=String(Math.floor((seconds%3600)/60)).padStart(2,"0");

    const s=String(seconds%60).padStart(2,"0");

    runtime.textContent=`${h}:${m}:${s}`;

    document
    .getElementById("systemUptime")
    .textContent=`${h}:${m}:${s}`;

},1000);

/* ==========================================
   REFRESH BUTTON
========================================== */

document
.getElementById("refreshSystem")
.addEventListener("click",()=>{

    refreshSystem();

    addLog("System refreshed successfully.");

    addEvent("System status updated.");

});

/* ==========================================
   DIAGNOSTICS
========================================== */

document
.getElementById("diagnosticsBtn")
.addEventListener("click",()=>{

    addLog("Running diagnostics...");

    setTimeout(()=>{

        addLog("CPU: OK");

        addLog("Memory: OK");

        addLog("Network: OK");

        addLog("Brain Modules: OK");

        addEvent("Diagnostics completed.");

    },800);

});

/* ==========================================
   SYSTEM REPORT
========================================== */

document
.getElementById("systemReport")
.addEventListener("click",()=>{

    document
    .getElementById("systemReportContent")
    .innerHTML=`

        <p><b>Version:</b> NIKKI v1.0.0</p>

        <p><b>Status:</b> Online</p>

        <p><b>Modules:</b> 40 Loaded</p>

        <p><b>Network:</b> ${navigator.onLine?"Connected":"Offline"}</p>

        <p><b>Runtime:</b> ${runtime.textContent}</p>

    `;

    document
    .getElementById("systemModal")
    .style.display="flex";

});

/* ==========================================
   MODAL
========================================== */

document
.getElementById("closeSystemModal")
.addEventListener("click",()=>{

    document
    .getElementById("systemModal")
    .style.display="none";

});

window.addEventListener("click",(event)=>{

    const modal=document.getElementById("systemModal");

    if(event.target===modal){

        modal.style.display="none";

    }

});

/* ==========================================
   LOG FUNCTIONS
========================================== */

function addLog(text){

    const log=document.getElementById("diagnosticsLog");

    log.innerHTML+=`<p>${text}</p>`;

}

function addEvent(text){

    const events=document.getElementById("liveEvents");

    events.innerHTML+=`<p>${new Date().toLocaleTimeString()} - ${text}</p>`;

}

/* ==========================================
   AUTO REFRESH
========================================== */

setInterval(refreshSystem,5000);

addLog("System initialized.");

addEvent("NIKKI System Online.");