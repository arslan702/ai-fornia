import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoQ6nZbUruhiX5SV37GVsrklVYGS0zJF4",
  authDomain: "new-ai-c7598.firebaseapp.com",
  projectId: "new-ai-c7598",
  storageBucket: "new-ai-c7598.appspot.com",
  messagingSenderId: "823141649138",
  appId: "1:823141649138:web:3de282435536327dc49e6b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
