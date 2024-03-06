
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCzFStC5seskWVxB-o7Ghjg38ubkO5itMg",
    authDomain: "expense-tracker-2e89a.firebaseapp.com",
    projectId: "expense-tracker-2e89a",
    storageBucket: "expense-tracker-2e89a.appspot.com",
    messagingSenderId: "106540340570",
    appId: "1:106540340570:web:70b20138d9658bb07ccf63"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)