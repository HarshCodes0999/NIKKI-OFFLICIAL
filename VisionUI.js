import VISION from "./Brain/Vision.js";

/* ==========================================
   VISION UI
========================================== */

const visionStatus=document.getElementById("visionStatus");

const cameraStatus=document.getElementById("cameraStatus");

const detectionStatus=document.getElementById("detectionStatus");

const objectCount=document.getElementById("objectCount");

const cameraView=document.getElementById("cameraView");

const scanHistory=document.getElementById("scanHistory");

let stream=null;

let scans=0;

VISION.initialize();

updateStatus();

/* ==========================================
   STATUS
========================================== */

function updateStatus(){

    visionStatus.textContent="🟢 Online";

    detectionStatus.textContent="Active";

}

/* ==========================================
   START CAMERA
========================================== */

document
.getElementById("startCamera")
.addEventListener("click",async()=>{

try{

stream=await navigator.mediaDevices.getUserMedia({

video:true

});

cameraView.srcObject=stream;

cameraStatus.textContent="Running";

addHistory("Camera Started");

}catch{

cameraStatus.textContent="Permission Denied";

}

});

/* ==========================================
   STOP CAMERA
========================================== */

document
.getElementById("stopCamera")
.addEventListener("click",()=>{

if(stream){

stream.getTracks().forEach(track=>track.stop());

cameraView.srcObject=null;

cameraStatus.textContent="Stopped";

addHistory("Camera Stopped");

}

});

/* ==========================================
   HISTORY
========================================== */

function addHistory(text){

scanHistory.innerHTML+=`

<p>

${new Date().toLocaleTimeString()} - ${text}

</p>

`;

}

/* ==========================================
   SCAN IMAGE
========================================== */

document
.getElementById("scanImage")
.addEventListener("click",()=>{

scans++;

document
.getElementById("totalScans")
.textContent=scans;

const objects=[
"Person",
"Mobile Phone",
"Laptop",
"Chair",
"Bottle",
"Book",
"Keyboard",
"Monitor"
];

const colors=[
"Blue",
"Black",
"White",
"Green",
"Red",
"Grey"
];

const object=

objects[Math.floor(Math.random()*objects.length)];

const faces=

Math.floor(Math.random()*3);

const color=

colors[Math.floor(Math.random()*colors.length)];

document
.getElementById("objectsDetected")
.textContent=object;

document
.getElementById("facesDetected")
.textContent=faces;

document
.getElementById("dominantColor")
.textContent=color;

document
.getElementById("ocrText")
.textContent=

"Demo OCR Result";

document
.getElementById("objectCount")
.textContent="1";

document
.getElementById("totalObjects")
.textContent=scans;

document
.getElementById("totalFaces")
.textContent=faces;

addHistory(`Detected ${object}`);

});

/* ==========================================
   DETAILS MODAL
========================================== */

cameraView.addEventListener("click",()=>{

document
.getElementById("visionModalContent")
.innerHTML=`

<p><b>Status:</b> Online</p>

<p><b>Camera:</b> ${cameraStatus.textContent}</p>

<p><b>Total Scans:</b> ${scans}</p>

<p><b>Detection:</b> Active</p>

`;

document
.getElementById("visionModal")
.style.display="flex";

});

document
.getElementById("closeVisionModal")
.addEventListener("click",()=>{

document
.getElementById("visionModal")
.style.display="none";

});

window.addEventListener("click",(event)=>{

const modal=document.getElementById("visionModal");

if(event.target===modal){

modal.style.display="none";

}

});

/* ==========================================
   AUTO UPDATE
========================================== */

setInterval(updateStatus,5000);

addHistory("Vision module initialized.");