import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBWclyV0Q711cy0G8dQmBrdZe2A4RE6qo",
  authDomain: "mockstore-c3a81.firebaseapp.com",
  projectId: "mockstore-c3a81",
  storageBucket: "mockstore-c3a81.appspot.com",
  messagingSenderId: "267544680893",
  appId: "1:267544680893:web:95b24b883ce7e1398d9ad4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const firestore = getFirestore(app);

// Get a reference to the Storage service
const storage = getStorage(app);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { app, firestore, storage, auth };