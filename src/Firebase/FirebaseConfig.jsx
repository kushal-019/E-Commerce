import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBloOKgnkUqzT07oo-fb1kldvhvbIxTX7A",
  authDomain: "ecommerce-website-98658.firebaseapp.com",
  projectId: "ecommerce-website-98658",
  storageBucket: "ecommerce-website-98658.appspot.com",
  messagingSenderId: "404093022513",
  appId: "1:404093022513:web:7d5fb2a63b1266cd018010"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {auth , firestore};