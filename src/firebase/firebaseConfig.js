import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBhN7QFKXbrfK2eTaw3a4CXg5Q7c1_jHlQ",
    authDomain: "d-binary-search.firebaseapp.com",
    projectId: "d-binary-search",
    storageBucket: "d-binary-search.firebasestorage.app",
    messagingSenderId: "585800123358",
    appId: "1:585800123358:web:e16d4d9866655ee677134f"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
