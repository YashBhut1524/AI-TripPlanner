// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4Z5hDdYfDuC_bcxhabCMFAtaaQwfPiyM",
    authDomain: "ai-trip-planner-a3652.firebaseapp.com",
    projectId: "ai-trip-planner-a3652",
    storageBucket: "ai-trip-planner-a3652.firebasestorage.app",
    messagingSenderId: "770558619122",
    appId: "1:770558619122:web:b674a6446b76df8d64cf6b",
    measurementId: "G-3NZRQCNTD9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);