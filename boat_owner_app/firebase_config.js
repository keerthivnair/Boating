// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVGv--4zj5H0TPzCRujlfEcZpnM7DeXK8",
  authDomain: "react-flutter-2b7d5.firebaseapp.com",
  projectId: "react-flutter-2b7d5",
  storageBucket: "react-flutter-2b7d5.firebasestorage.app",
  messagingSenderId: "179784584769",
  appId: "1:179784584769:web:5d8c9be752e2f456b240c0",
  measurementId: "G-355H2CENZG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);   
export const db = getFirestore(app);     
export const auth = getAuth(app);

