import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCwDrTL9FaqlMZfXPTIo7wRGIgpHQuB4t0",
  authDomain: "taskappauth-b0b22.firebaseapp.com",
  projectId: "taskappauth-b0b22",
  storageBucket: "taskappauth-b0b22.firebasestorage.app",
  messagingSenderId: "185622775044",
  appId: "1:185622775044:web:273642770b7b2fb68bbc51",
  measurementId: "G-M685KCELH5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth,provider}