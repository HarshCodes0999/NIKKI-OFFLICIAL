/* ==========================================
   NIKKI GLOBAL JS v1.0
   PART 1
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

console.log("🚀 NIKKI Global Loaded");

initFade();

initRipple();

initSmoothScroll();

initBackToTop();

});

/* ==========================================
   FADE IN
========================================== */

function initFade(){

const elements=document.querySelectorAll(

".card,.glass,.fade"

);

elements.forEach((el,index)=>{

el.style.opacity="0";

el.style.transform="translateY(20px)";

setTimeout(()=>{

el.style.transition=".5s";

el.style.opacity="1";

el.style.transform="translateY(0)";

},index*80);

});

}

/* ==========================================
   RIPPLE
========================================== */

function initRipple(){

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const circle=document.createElement("span");

const size=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=size+"px";

circle.style.height=size+"px";

circle.style.left=

e.offsetX-size/2+"px";

circle.style.top=

e.offsetY-size/2+"px";

circle.classList.add("ripple-effect");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll(

'a[href^="#"]'

).forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ==========================================
   BACK TO TOP
========================================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.className="btn";

topBtn.style.position="fixed";

topBtn.style.bottom="25px";

topBtn.style.right="25px";

topBtn.style.display="none";

topBtn.style.zIndex="999";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================
   HELPERS
========================================== */

function $(id){

return document.getElementById(id);

}

function $all(selector){

return document.querySelectorAll(selector);

}

function random(min,max){

return Math.floor(

Math.random()*(max-min+1)

)+min;

}

/* ==========================================
   NIKKI GLOBAL JS v1.0
   PART 2
========================================== */

/* ==========================================
   CURSOR GLOW
========================================== */

const cursor=document.createElement("div");

cursor.className="cursor-glow";

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

/* ==========================================
   3D CARD TILT
========================================== */

document.querySelectorAll(".card-3d").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*16;

const rotateX=((rect.height/2-y)/rect.height)*16;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

});

});

/* ==========================================
   MAGNETIC BUTTONS
========================================== */

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=

`translate(${x*0.15}px,${y*0.15}px)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translate(0,0)";

});

});

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealItems=document.querySelectorAll(

".reveal"

);

function revealOnScroll(){

const trigger=

window.innerHeight*0.85;

revealItems.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<trigger){

item.classList.add("active");

}

});

}

window.addEventListener(

"scroll",

revealOnScroll

);

revealOnScroll();

/* ==========================================
   COUNTER
========================================== */

document.querySelectorAll("[data-count]").forEach(counter=>{

const target=

Number(counter.dataset.count);

let current=0;

const timer=setInterval(()=>{

current+=Math.ceil(target/80);

if(current>=target){

current=target;

clearInterval(timer);

}

counter.textContent=current;

},20);

});

/* ==========================================
   PROGRESS BAR
========================================== */

document.querySelectorAll(".progress-fill").forEach(bar=>{

const value=

bar.dataset.progress||0;

setTimeout(()=>{

bar.style.width=value+"%";

},300);

});

/* ==========================================
   PARALLAX
========================================== */

window.addEventListener("mousemove",(e)=>{

document.querySelectorAll(".parallax").forEach(layer=>{

const speed=

layer.dataset.speed||2;

const x=

(window.innerWidth/2-e.clientX)/speed;

const y=

(window.innerHeight/2-e.clientY)/speed;

layer.style.transform=

`translate(${x}px,${y}px)`;

});

});

/* ==========================================
   NIKKI GLOBAL JS v1.0
   PART 3
========================================== */

/* ==========================================
   THEME MANAGER
========================================== */

const THEME_KEY="nikki-theme";

function loadTheme(){

const saved=localStorage.getItem(THEME_KEY);

if(saved){

document.body.setAttribute("data-theme",saved);

}

}

function toggleTheme(){

const current=document.body.getAttribute("data-theme");

const next=current==="light"

? "dark"

: "light";

document.body.setAttribute("data-theme",next);

localStorage.setItem(THEME_KEY,next);

}

/* ==========================================
   TOAST
========================================== */

function showToast(message,type="success"){

const toast=document.createElement("div");

toast.className=`toast ${type}`;

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},3000);

}

/* ==========================================
   LOADER
========================================== */

const loader=document.createElement("div");

loader.className="global-loader";

loader.innerHTML="<div class='loader'></div>";

document.body.appendChild(loader);

function showLoader(){

loader.style.display="flex";

}

function hideLoader(){

loader.style.display="none";

}

/* ==========================================
   CONFIRM BOX
========================================== */

function confirmBox(message,callback){

const ok=confirm(message);

if(ok && callback){

callback();

}

}

/* ==========================================
   UTILITIES
========================================== */

function sleep(ms){

return new Promise(resolve=>{

setTimeout(resolve,ms);

});

}

function generateID(){

return "ID-"+

Math.random()

.toString(36)

.substring(2,10)

.toUpperCase();

}

function formatTime(){

return new Date()

.toLocaleTimeString();

}

/* ==========================================
   GLOBAL API
========================================== */

window.NIKKI={

showToast,

showLoader,

hideLoader,

confirmBox,

toggleTheme,

sleep,

generateID,

formatTime

};

/* ==========================================
   START
========================================== */

loadTheme();

console.log("✅ NIKKI Global System Ready");