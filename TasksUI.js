import TASKS from "./Brain/TaskQueue.js";

/* ==========================================
   TASKS UI
========================================== */

const taskList=document.getElementById("taskList");

const taskInput=document.getElementById("taskInput");

const totalTasks=document.getElementById("totalTasks");

const completedTasks=document.getElementById("completedTasks");

const pendingTasks=document.getElementById("pendingTasks");

const priorityTasks=document.getElementById("priorityTasks");

const taskHistory=document.getElementById("taskHistory");

let tasks=[];

TASKS.initialize();

updateStats();

/* ==========================================
   UPDATE STATS
========================================== */

function updateStats(){

totalTasks.textContent=tasks.length;

completedTasks.textContent=

tasks.filter(t=>t.completed).length;

pendingTasks.textContent=

tasks.filter(t=>!t.completed).length;

priorityTasks.textContent=

tasks.filter(t=>t.priority).length;

}

/* ==========================================
   SAVE TASK
========================================== */

document
.getElementById("saveTask")
.addEventListener("click",()=>{

const text=taskInput.value.trim();

if(text==="") return;

tasks.push({

title:text,

completed:false,

priority:false

});

renderTasks();

taskInput.value="";

addHistory(`Task Added: ${text}`);

updateStats();

});

/* ==========================================
   RENDER TASKS
========================================== */

function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

taskList.innerHTML+=`

<p>

✅ ${task.title}

<button onclick="completeTask(${index})">

Done

</button>

</p>

`;

});

}

/* ==========================================
   COMPLETE TASK
========================================== */

window.completeTask=function(index){

tasks[index].completed=true;

renderTasks();

updateStats();

document
.getElementById("todayCompleted")
.textContent=

tasks.filter(t=>t.completed).length;

document
.getElementById("completionRate")
.textContent=

Math.round(
(tasks.filter(t=>t.completed).length/tasks.length)*100
)+"%";

document
.getElementById("productivityScore")
.textContent=

tasks.filter(t=>t.completed).length*10;

addHistory(`Completed: ${tasks[index].title}`);

};

/* ==========================================
   CLEAR TASKS
========================================== */

document
.getElementById("clearTasks")
.addEventListener("click",()=>{

tasks=[];

renderTasks();

updateStats();

document
.getElementById("todayTasks").textContent="0";

document
.getElementById("todayCompleted").textContent="0";

document
.getElementById("completionRate").textContent="0%";

document
.getElementById("productivityScore").textContent="0";

addHistory("All tasks cleared.");

});

/* ==========================================
   REFRESH
========================================== */

document
.getElementById("refreshTasks")
.addEventListener("click",()=>{

updateStats();

document
.getElementById("todayTasks")
.textContent=tasks.length;

addHistory("Task list refreshed.");

});

/* ==========================================
   HISTORY
========================================== */

function addHistory(text){

taskHistory.innerHTML+=`

<p>

${new Date().toLocaleTimeString()} - ${text}

</p>

`;

}

/* ==========================================
   MODAL
========================================== */

taskList.addEventListener("click",()=>{

document
.getElementById("taskModalContent")
.innerHTML=`

<p><b>Total Tasks:</b> ${tasks.length}</p>

<p><b>Completed:</b> ${tasks.filter(t=>t.completed).length}</p>

<p><b>Pending:</b> ${tasks.filter(t=>!t.completed).length}</p>

`;

document
.getElementById("taskModal")
.style.display="flex";

});

document
.getElementById("closeTaskModal")
.addEventListener("click",()=>{

document
.getElementById("taskModal")
.style.display="none";

});

window.addEventListener("click",(event)=>{

const modal=document.getElementById("taskModal");

if(event.target===modal){

modal.style.display="none";

}

});

/* ==========================================
   STARTUP
========================================== */

document
.getElementById("todayTasks")
.textContent="0";

addHistory("Task module initialized.");