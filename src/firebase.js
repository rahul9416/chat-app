// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBXcR4Ym9Ri-gFHWcrtLgKT95eIDVZTHZc",
  authDomain: "chat-app-91abd.firebaseapp.com",
  projectId: "chat-app-91abd",
  storageBucket: "chat-app-91abd.appspot.com",
  messagingSenderId: "266387833127",
  appId: "1:266387833127:web:9e0173b6adfc1d92dd2902",
  measurementId: "G-HKGV73NX6V"
};

// Initialize Firebase
const firebase= initializeApp(firebaseConfig);
export const auth = getAuth();
export default firebase