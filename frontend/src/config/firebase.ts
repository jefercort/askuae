import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfSNy2qsHAidRPn6kKHggyWFuc7_gaDis",
  authDomain: "ask-uae.firebaseapp.com",
  projectId: "ask-uae",
  storageBucket: "ask-uae.firebasestorage.app",
  messagingSenderId: "426539063370",
  appId: "1:426539063370:web:a86e465666a6bc9a3aaeb3",
  measurementId: "G-7Z8G0CSBVK"
};
// aca se hace la CONEXIÓN con el proyecto (apiKey) y exporta `auth`
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);
