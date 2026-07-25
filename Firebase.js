import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRKZOvdW1J5-lDEy-2CBbyUmVUSIoGX4o",
  authDomain: "my-project-954ea.firebaseapp.com",
  projectId: "my-project-954ea",
  storageBucket: "my-project-954ea.firebasestorage.app",
  messagingSenderId: "117432543843",
  appId: "1:117432543843:web:f451047725fe3cc04b2656"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);