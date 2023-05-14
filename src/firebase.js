import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  //config
  apiKey: "AIzaSyCoGmW41Usp9VNBKwMU69JUoxk_ue5qtAI",
  authDomain: "links-7f59e.firebaseapp.com",
  databaseURL: "https://links-7f59e.firebaseio.com",
  projectId: "links-7f59e",
  storageBucket: "links-7f59e.appspot.com",
  messagingSenderId: "1034605785484",
  appId: "1:1034605785484:web:51216a38fb289e6f66a6a9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
