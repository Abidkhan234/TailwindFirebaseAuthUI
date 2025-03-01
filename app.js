
const container = document.querySelector(".main-container");

const toggleBtn1 = document.querySelector(".toggle-box-1 button");
const toggleBtn2 = document.querySelector(".toggle-box-2 button");

toggleBtn1.addEventListener("click", () => container.classList.add("check"));

toggleBtn2.addEventListener("click", () => container.classList.remove("check"));

// For password check

const passwordEyeBtn = document.querySelectorAll(".password-eye-btn");

passwordEyeBtn.forEach((v) => {
    v.addEventListener("click", () => passwordChecker(v));
})

const passwordChecker = (v) => {

    let i = v.querySelector("i");

    let passwordBox = v.parentElement.parentElement.querySelector(".password")

    if (i.classList.contains("fa-eye-slash")) {

        passwordBox.type = "text";
        i.classList.replace("fa-eye-slash", "fa-eye");

    } else {

        passwordBox.type = "password";
        i.classList.replace("fa-eye", "fa-eye-slash");

    }

}

// For password check

// For FireBase Sign-Up

const loginEmailBox = document.getElementById("email");

const loginPasswordBox = document.getElementById("password");

const signInEmailBox = document.getElementById("signInemail");

const fullNameBox = document.getElementById("fullName");

const signInPasswordBox = document.getElementById("signInpassword");

const signInBtn = document.getElementById("signIn-btn");

const loginBtn = document.getElementById("login-btn");

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
;

const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;

import { auth, createUserWithEmailAndPassword, db, doc, getDoc, setDoc, signInWithEmailAndPassword } from "./fireBase.js";

signInBtn.addEventListener("click", () => signInChecking());

loginBtn.addEventListener("click", () => loginChecking());

const errorFunc = (message, duration, color) => {

    if (message === "auth/email-already-in-use") {
        message = "Email already in use.";
    } else if (message === "auth/invalid-credential") {
        message = "Invalid Email OR Password.";
    }

    Toastify({

        text: message,

        duration: duration,

        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`

        style: {
            background: color,
        }

    }).showToast();

}

const signInChecking = () => {

    if (signInEmailBox.value == "" && signInPasswordBox.value == "" && fullNameBox.value == "") {
        errorFunc("All fields are mandatory.", 2000, "red");
    } else if (fullNameBox.value.length < 3) {
        errorFunc("Incorrect user name.", 2000, "red");
    } else if (!emailRegex.test(signInEmailBox.value)) {
        errorFunc("Invalid email format.", 2000, "red");
    } else if (!passwordRegex.test(signInPasswordBox.value)) {
        errorFunc("Password must 6 character long.", 4000, "red");
    } else {

        createUserWithEmailAndPassword(auth, signInEmailBox.value, signInPasswordBox.value)

            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...


                // For setting FireBase
                try {
                    await setDoc(doc(db, "users", user.uid), {
                        email: signInEmailBox.value,
                        fullName: fullNameBox.value
                    });

                    errorFunc("Signed in successfully.", 3000, "green");

                    localStorage.setItem("uid", user.uid);

                    signInEmailBox.value = "";
                    fullNameBox.value = "";
                    signInPasswordBox.value = "";


                    container.classList.remove("check");

                } catch (error) {
                    console.log(error);
                }
                // For setting FireBase

            })
            .catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                // ..

                errorFunc(`${errorCode}`, 2000, "red")

                return;
            });

    }

}

// For FireBase Sign-Up

// For FireBase Login

const loginChecking = () => {

    const uid = localStorage.getItem("uid");

    if (uid) {


        if (loginPasswordBox.value == "" && loginEmailBox.value == "") {
            errorFunc("All fields are mandatory.", 2000, "red");
        } else if (!emailRegex.test(loginEmailBox.value)) {
            errorFunc("Invalid email format.", 2000, "red");
        } else {

            signInWithEmailAndPassword(auth, loginEmailBox.value, loginPasswordBox.value)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...

                    try {

                        let data;

                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            data = docSnap.data();
                        } else {
                            errorFunc("No user available.", 2000, "red");
                        }

                        localStorage.setItem("Data", JSON.stringify(data));

                        loginEmailBox.value = "";
                        loginPasswordBox.value = "";

                        errorFunc("Logged in successfully.", 2000, "green");

                    } catch (error) {
                        console.log(error);
                        errorFunc("An error occurred while checking the email.", 2000, "red");
                    }

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    errorFunc(`${errorCode}`, 3000, "red");

                    return;
                });

        }

    } else {
        errorFunc("Create Account First.", 1000, "red")
        container.classList.add("check");
    }

}

// For FireBase Login