import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1yghRWlnj_dQaOoej9PT4-gXxlGOcbjA",
  authDomain: "sellerappdb.firebaseapp.com",
  projectId: "sellerappdb",
  storageBucket: "sellerappdb.firebasestorage.app",
  messagingSenderId: "14531469795",
  appId: "1:14531469795:web:064879fbea940d54af80d6",
  measurementId: "G-B9CDD22M3Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInAnonymously };



