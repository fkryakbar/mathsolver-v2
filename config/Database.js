import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getCountFromServer,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYotPonB4Fz8TkgymZod28wedQ97xgSAI",
  authDomain: "mathsolver-15230.firebaseapp.com",
  projectId: "mathsolver-15230",
  storageBucket: "mathsolver-15230.appspot.com",
  messagingSenderId: "34166676313",
  appId: "1:34166676313:web:53b695cc9a8c48fcc34a48",
  measurementId: "G-5RLB1YZ08P",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveInput(payload) {
  try {
    const docRef = await addDoc(collection(db, "userInput"), payload);
    return true;
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function count() {
  const coll = collection(db, "userInput");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}
