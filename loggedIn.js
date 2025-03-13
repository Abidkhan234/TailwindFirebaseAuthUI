import { auth, onAuthStateChanged } from "./fireBase.js";

const userData = () => {

    onAuthStateChanged(auth, (user) => {
        if (user) {

            userName.innerText = user.displayName ? user.displayName : "";

            userPic.src =
                user.photoURL;



        } else {

        }
    });

};

userData();