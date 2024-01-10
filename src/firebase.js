import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfbhC2kri26s_JJqZllQ0TIvu-R5vt59M",
  authDomain: "qr-admin-1b3aa.firebaseapp.com",
  projectId: "qr-admin-1b3aa",
  storageBucket: "qr-admin-1b3aa.appspot.com",
  messagingSenderId: "577803624780",
  appId: "1:577803624780:web:83d0da0ba47d9f33b9efe9",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore(app);
export const auth = firebase.auth(app);
