// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSeOIc5hMH-admLVjrVLmNiq1NTYtSmfk",
  authDomain: "finance-tracker-app-809f3.firebaseapp.com",
  projectId: "finance-tracker-app-809f3",
  storageBucket: "finance-tracker-app-809f3.appspot.com",
  messagingSenderId: "837035181648",
  appId: "1:837035181648:web:d647424cee9967663df355",
  measurementId: "G-XFGL2Q0D3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
