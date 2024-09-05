// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuBJF-FV7X_DUW5QaeQZXzSmT28zwDS7w",
  authDomain: "chess-repertoire-1f7b7.firebaseapp.com",
  projectId: "chess-repertoire-1f7b7",
  storageBucket: "chess-repertoire-1f7b7.appspot.com",
  messagingSenderId: "449032224416",
  appId: "1:449032224416:web:a4d36973108243233593c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function FirebaseCode() {
  return <div></div>;
}

export { auth };
