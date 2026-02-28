import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

export const signup = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        return result.user
    } catch (error) {
        throw error
    }
}

export const login = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        return result.user
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        throw error
    }
}
