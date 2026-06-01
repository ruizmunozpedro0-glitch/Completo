import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW-yvvKsP3-2o2IYV2zZ00vu0Qt4jHdYo",
  authDomain: "react-fr-5855e.firebaseapp.com",
  projectId: "react-fr-5855e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);