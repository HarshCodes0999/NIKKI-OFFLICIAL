import { auth, db } from "./Firebase.js";
import NIKKI from "./NIKKI.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================
   Authentication Check
========================== */

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "index.html";
        return;

    }
   /* ==========================
   Boot NIKKI Engine
========================== */

try {

    console.log("Starting NIKKI AI...");

    const result = await NIKKI.boot();

    if(result.success){

        console.log("NIKKI AI Online");

    }else{

        console.error(result.error);

    }

}catch(error){

    console.error("NIKKI Boot Failed:", error);

}

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            const userName = document.getElementById("userName");

            if (userName) {
                userName.textContent = data.name || "User";
            }

        } else {

            const userName = document.getElementById("userName");

            if (userName) {
                userName.textContent = "User";
            }

        }

    } catch (error) {

        console.error("Error loading user:", error);

    }

});

/* ==========================
   Logout
========================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href = "index.html";

        } catch (error) {

            alert("Logout Failed");

            console.error(error);

        }

    });

}

/* ==========================
   Sidebar Navigation
========================== */

function openPage(id, page) {

    const element = document.getElementById(id);

    if (element) {

        element.addEventListener("click", () => {

            window.location.href = page;

        });

    }

}

openPage("dashboardBtn", "Dashboard.html");

openPage("teamBtn", "Team.html");

openPage("aboutBtn", "About.html");

openPage("privacyBtn", "Privacy.html");

openPage("termsBtn", "Terms.html");

openPage("profileBtn", "Profile.html");

/* ==========================
   Future Pages
========================== */

function comingSoon(id, feature) {

    const element = document.getElementById(id);

    if (element) {

        element.addEventListener("click", () => {

            alert(feature + " Coming Soon 🚀");

        });

    }

}

/* ==========================
   Dashboard Buttons
========================== */

openPage("chatBtn", "Chat.html");

openPage("openChat", "Chat.html");

comingSoon("brainBtn", "Brain");

comingSoon("memoryBtn", "Memory");

comingSoon("taskBtn", "Tasks");

comingSoon("goalBtn", "Goals");

comingSoon("voiceBtn", "Voice");

comingSoon("visionBtn", "Vision");

comingSoon("settingsBtn", "Settings");

comingSoon("openBrain", "Brain");

comingSoon("openMemory", "Memory");

comingSoon("openSystem", "System Status");