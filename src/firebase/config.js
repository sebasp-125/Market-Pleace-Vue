import { initializeApp } from "firebase/app";
// Llamando la  coleccion de la db
import { getFirestore } from 'firebase/firestore';
//Lamando the verfication user/password
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBDb9hLKKQimX9qmv0xwpRQECTZ-cwvVW4",
  authDomain: "marketplace-392b6.firebaseapp.com",
  projectId: "marketplace-392b6",
  storageBucket: "marketplace-392b6.appspot.com",
  messagingSenderId: "573656369658",
  appId: "1:573656369658:web:b19f5d600cc2bf65c2fc43",
  measurementId: "G-BB7FZ2DFFK"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const  auth = getAuth(app)