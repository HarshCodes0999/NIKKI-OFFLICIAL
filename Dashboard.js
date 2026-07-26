import { auth, db } from "./Firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   Check Login
========================= */

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        location.href = "index.html";
        return;

    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            document.getElementById("userName").textContent =
                userSnap.data().name;

        } else {

            document.getElementById("userName").textContent =
                "User";

        }

    }

    catch (err) {

        console.error(err);

    }

});

/* =========================
   Logout
========================= */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    location.href = "index.html";

});