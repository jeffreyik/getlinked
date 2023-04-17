import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "getlnked.firebaseapp.com",
  projectId: "getlnked",
  storageBucket: "getlnked.appspot.com",
  messagingSenderId: "372649152439",
  appId: "1:372649152439:web:56c5976b30fd756927a232",
  measurementId: "G-F6RQ5GN9VM"
}; 


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)