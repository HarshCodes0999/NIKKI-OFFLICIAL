import { auth, db } from "./Firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================================
   DASHBOARD START
========================================== */

console.log("Dashboard Loaded");

/* ==========================================
   AUTH CHECK
========================================== */

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";

        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        const userName = document.getElementById("userName");

        if (userSnap.exists()) {

            const data = userSnap.data();

            userName.textContent = data.name || "User";

        } else {

            userName.textContent = "User";

        }

    } catch (error) {

        console.error(error);

    }

});

/* ==========================================
   LOGOUT
========================================== */

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", async()=>{

        try{

            await signOut(auth);

            window.location.href="index.html";

        }

        catch(error){

            console.error(error);

            alert("Logout Failed");

        }

    });

}

/* ==========================================
   PAGE NAVIGATION
========================================== */

function openPage(id,page){

    const element=document.getElementById(id);

    if(!element) return;

    element.addEventListener("click",()=>{

        window.location.href=page;

    });

}

/* ==========================================
   SIDEBAR
========================================== */

openPage("dashboardBtn","Dashboard.html");

openPage("chatBtn","Chat.html");

openPage("teamBtn","Team.html");

openPage("aboutBtn","About.html");

openPage("profileBtn","Profile.html");

openPage("privacyBtn","Privacy.html");

openPage("termsBtn","Terms.html");

/* ==========================================
   SIDEBAR NAVIGATION
========================================== */

openPage("dashboardBtn","Dashboard.html");

openPage("chatBtn","Chat.html");

openPage("brainBtn","Brain.html");

openPage("memoryBtn","Memory.html");

openPage("taskBtn","Tasks.html");

openPage("goalBtn","Goals.html");

openPage("voiceBtn","Voice.html");

openPage("visionBtn","Vision.html");

openPage("settingsBtn","Settings.html");

openPage("profileBtn","Profile.html");

openPage("teamBtn","Team.html");

openPage("aboutBtn","About.html");

openPage("privacyBtn","Privacy.html");

openPage("termsBtn","Terms.html");

/* ==========================================
   QUICK ACCESS BUTTONS
========================================== */

openPage("openBrain","Brain.html");

openPage("openChat","Chat.html");

openPage("openMemory","Memory.html");

openPage("openSystem","System.html");

/* ==========================================
   ACTIVE SIDEBAR
========================================== */

const sidebarItems = document.querySelectorAll(".sidebar li");

sidebarItems.forEach(item=>{

    item.addEventListener("click",()=>{

        sidebarItems.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

    });

});

/* ==========================================
   DASHBOARD INITIALIZED
========================================== */

console.log("====================================");

console.log("NIKKI Dashboard Ready");

console.log("Authentication : OK");

console.log("Navigation : OK");

console.log("Firebase : Connected");

console.log("====================================");