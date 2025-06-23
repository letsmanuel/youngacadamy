
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJrGaaNgz1UQB9rqRpOlciiJsgJ8lIALU",
  authDomain: "young-academy-bc958.firebaseapp.com",
  projectId: "young-academy-bc958",
  storageBucket: "young-academy-bc958.firebasestorage.app",
  messagingSenderId: "696631159427",
  appId: "1:696631159427:web:b887bb65d5e0a7b7ec89b6",
  measurementId: "G-CXPKJQW56L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
