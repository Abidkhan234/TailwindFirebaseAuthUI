import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js'

import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBMQI71i3QS4hvlEi0HS-WVJaUcalIOGTM",
    authDomain: "biccas-project.firebaseapp.com",
    projectId: "biccas-project",
    storageBucket: "biccas-project.firebasestorage.app",
    messagingSenderId: "638194531207",
    appId: "1:638194531207:web:34dad5035f960d8d293122",
    measurementId: "G-TSKRTCFZLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth, createUserWithEmailAndPassword, doc, setDoc, getDoc, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider }