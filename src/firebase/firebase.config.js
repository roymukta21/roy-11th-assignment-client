// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlCrWCK0-fesYTQA9HlcD_Eog47eYiCJQ",
  authDomain: "local-chef-bazaar-a84fe.firebaseapp.com",
  projectId: "local-chef-bazaar-a84fe",
  storageBucket: "local-chef-bazaar-a84fe.firebasestorage.app",
  messagingSenderId: "312714479406",
  appId: "1:312714479406:web:a93e59d361818d89f5dcbf"
};

// Initialize Firebaseza
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);