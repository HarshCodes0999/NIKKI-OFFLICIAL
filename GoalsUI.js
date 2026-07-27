import GOALS from "./Brain/GoalManager.js";

/* ==========================================
   GOALS UI
========================================== */

const goalList=document.getElementById("goalList");

const goalInput=document.getElementById("goalInput");

const totalGoals=document.getElementById("totalGoals");

const completedGoals=document.getElementById("completedGoals");

const activeGoals=document.getElementById("activeGoals");

const goalRate=document.getElementById("goalRate");

const goalHistory=document.getElementById("goalHistory");

let goals=[];

GOALS.initialize();

updateStats();

/* ==========================================
   UPDATE STATS
========================================== */

function updateStats(){

totalGoals.textContent=goals.length;

completedGoals.textContent=

goals.filter(g=>g.completed).length;

activeGoals.textContent=

goals.filter(g=>!g.completed).length;

goalRate.textContent=

goals.length===0

? "0%"

: Math.round(

(goals.filter(g=>g.completed).length/

goals.length)*100

)+"%";

}

/* ==========================================
   SAVE GOAL
========================================== */

document
.getElementById("saveGoal")
.addEventListener("click",()=>{

const text=goalInput.value.trim();

if(text==="") return;

goals.push({

title:text,

completed:false,

priority:false

});

renderGoals();

goalInput.value="";

addHistory(`Goal Added: ${text}`);

updateStats();

});

/* ==========================================
   RENDER GOALS
========================================== */

function renderGoals(){

goalList.innerHTML="";

goals.forEach((goal,index)=>{

goalList.innerHTML+=`

<p>

🎯 ${goal.title}

<button onclick="completeGoal(${index})">

Done

</button>

</p>

`;

});

}

/* ==========================================
   COMPLETE GOAL
========================================== */

window.completeGoal=function(index){

goals[index].completed=true;

renderGoals();

updateStats();

document
.getElementById("todayGoals")
.textContent=goals.length;

document
.getElementById("todayCompleted")
.textContent=

goals.filter(g=>g.completed).length;

document
.getElementById("achievementRate")
.textContent=

Math.round(

(goals.filter(g=>g.completed).length/

goals.length)*100

)+"%";

document
.getElementById("goalProductivity")
.textContent=

goals.filter(g=>g.completed).length*10;

addHistory(`Completed: ${goals[index].title}`);

};

/* ==========================================
   CLEAR GOALS
========================================== */

document
.getElementById("clearGoals")
.addEventListener("click",()=>{

goals=[];

renderGoals();

updateStats();

document
.getElementById("todayGoals").textContent="0";

document
.getElementById("todayCompleted").textContent="0";

document
.getElementById("achievementRate").textContent="0%";

document
.getElementById("goalProductivity").textContent="0";

document
.getElementById("mainGoal").textContent="None";

document
.getElementById("todayGoal").textContent="None";

document
.getElementById("weeklyGoal").textContent="None";

document
.getElementById("monthlyGoal").textContent="None";

addHistory("All goals cleared.");

});

/* ==========================================
   REFRESH
========================================== */

document
.getElementById("refreshGoals")
.addEventListener("click",()=>{

updateStats();

document
.getElementById("todayGoals")
.textContent=goals.length;

addHistory("Goal list refreshed.");

});

/* ==========================================
   HISTORY
========================================== */

function addHistory(text){

goalHistory.innerHTML+=`

<p>

${new Date().toLocaleTimeString()} - ${text}

</p>

`;

}

/* ==========================================
   MODAL
========================================== */

goalList.addEventListener("click",()=>{

document
.getElementById("goalModalContent")
.innerHTML=`

<p><b>Total Goals:</b> ${goals.length}</p>

<p><b>Completed:</b> ${goals.filter(g=>g.completed).length}</p>

<p><b>Active:</b> ${goals.filter(g=>!g.completed).length}</p>

`;

document
.getElementById("goalModal")
.style.display="flex";

});

document
.getElementById("closeGoalModal")
.addEventListener("click",()=>{

document
.getElementById("goalModal")
.style.display="none";

});

window.addEventListener("click",(event)=>{

const modal=document.getElementById("goalModal");

if(event.target===modal){

modal.style.display="none";

}

});

/* ==========================================
   STARTUP
========================================== */

document
.getElementById("todayGoals")
.textContent="0";

addHistory("Goal module initialized.");