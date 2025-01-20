// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAC08lEUOtePnZxHox5Z2w-Nyid-zyCpuY",
  authDomain: "fir-auth-9eaa4.firebaseapp.com",
  projectId: "fir-auth-9eaa4",
  storageBucket: "fir-auth-9eaa4.firebasestorage.app",
  messagingSenderId: "76771039987",
  appId: "1:76771039987:web:537ad6d73030eb20a1b586",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
