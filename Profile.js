import { auth, db } from "./Firebase.js";

import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "index.html";

        return;

    }

    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("profileUID").textContent = user.uid;

    document.getElementById("profileCreated").textContent =
        new Date(user.metadata.creationTime).toLocaleDateString();

    const userRef = doc(db, "users", user.uid);

    const snap = await getDoc(userRef);

    if (snap.exists()) {

        const data = snap.data();

        document.getElementById("userName").textContent = data.name;

        document.getElementById("profileName").textContent = data.name;

    } else {

        document.getElementById("userName").textContent = "NIKKI User";

        document.getElementById("profileName").textContent = "NIKKI User";

    }

});

/* ===========================
   Logout
=========================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        try {

            await signOut(auth);

            alert("Logged out successfully!");

            location.href = "index.html";

        }

        catch(error){

            alert(error.message);

        }

    });

}

/* ===========================
   Edit Profile
=========================== */

const editBtn = document.getElementById("editProfileBtn");

if(editBtn){

    editBtn.addEventListener("click",()=>{

        alert("🚧 Edit Profile feature will be available in the next update.");

    });

}

/* ===========================
   Console
=========================== */

console.log("✅ NIKKI AI Profile Loaded Successfully");