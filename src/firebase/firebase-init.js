// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKjYi481CgSkR_ZVFuBm_-6bye0W9EgV8",
    authDomain: "sols-1565c.firebaseapp.com",
    projectId: "sols-1565c",
    storageBucket: "sols-1565c.appspot.com",
    messagingSenderId: "900583123177",
    appId: "1:900583123177:web:98dc83bbb7e90c271ce878",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Fire = {
    app: app,
    store: getFirestore(app),
    storage: getStorage(app),
    auth: getAuth(app),
};

export default Fire;
