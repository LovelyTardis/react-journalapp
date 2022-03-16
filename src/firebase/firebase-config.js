import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCN-BAC8qg6oQJFwlkec5SBbFYeOEMy8Ac",
  authDomain: "react-app-cursos-6d0f4.firebaseapp.com",
  projectId: "react-app-cursos-6d0f4",
  storageBucket: "react-app-cursos-6d0f4.appspot.com",
  messagingSenderId: "975294515833",
  appId: "1:975294515833:web:834ca8b5c5786159f322a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    auth
}