import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================
   Toast Notification
========================= */

function toast(message) {

    const t = document.createElement("div");

    t.className = "toast";

    t.innerHTML = message;

    document.body.appendChild(t);

    setTimeout(() => {

        t.classList.add("show");

    }, 100);

    setTimeout(() => {

        t.classList.remove("show");

        setTimeout(() => {

            t.remove();

        }, 400);

    }, 2500);

}

/* =========================
   Loading Button
========================= */

function setLoading(btn, text) {

    btn.classList.add("loading");

    btn.disabled = true;

    btn.innerHTML = text;

}

function removeLoading(btn, text) {

    btn.classList.remove("loading");

    btn.disabled = false;

    btn.innerHTML = text;

}

/* =========================
   Register
========================= */

window.register = async function () {

    const btn = document.querySelector("button");

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("registerEmail").value.trim();

const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {

        toast("⚠ Fill all fields");

        return;

    }

    if (password.length < 6) {

        toast("🔒 Password must be at least 6 characters");

        return;

    }

    setLoading(btn, "Creating Account...");

    try {

        const user = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", user.user.uid), {

            name,

            email

        });

        removeLoading(btn, "Register");

        toast("🎉 Registration Successful");

        setTimeout(() => {

            location.href = "index.html";

        }, 1500);

    }

    catch (err) {

        removeLoading(btn, "Register");

        toast(err.message);

    }

}

/* =========================
   Login
========================= */

window.login = async function () {

    const btn = document.querySelector("button");

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    if (!email || !password) {

        toast("⚠ Enter Email & Password");

        return;

    }

    setLoading(btn, "Signing In...");

    try {

        await signInWithEmailAndPassword(auth, email, password);

        removeLoading(btn, "Sign In");

        toast("🚀 Login Successful");

        setTimeout(() => {

            location.href = "dashboard.html";

        }, 1200);

    }

    catch (err) {

        removeLoading(btn, "Sign In");

        toast(err.message);

    }

}

/* =========================
   Logout
========================= */

window.logout = async function () {

    await signOut(auth);

    toast("👋 Logged Out");

    setTimeout(() => {

        location.href = "index.html";

    }, 1000);

}

/* =========================
   Show / Hide Password
========================= */

const eye = document.querySelector(".eye");

if (eye) {

    eye.addEventListener("click", () => {

        const pass = document.getElementById("password");

        if (pass.type === "password") {

            pass.type = "text";

            eye.classList.remove("fa-eye");

            eye.classList.add("fa-eye-slash");

        } else {

            pass.type = "password";

            eye.classList.remove("fa-eye-slash");

            eye.classList.add("fa-eye");

        }

    });

}

/* =========================
   Login / Register Switch
========================= */

window.showRegister = function () {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("registerForm").style.display = "block";

}

window.showLogin = function () {

    document.getElementById("registerForm").style.display = "none";

    document.getElementById("loginForm").style.display = "block";

}