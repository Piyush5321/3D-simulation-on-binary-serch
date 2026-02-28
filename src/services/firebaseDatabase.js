import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

export const saveDataset = async (userId, data) => {
    try {
        const docRef = await addDoc(collection(db, 'datasets'), {
            userId,
            data,
            createdAt: new Date(),
            numbers: data.split(',').map(n => parseInt(n.trim()))
        })
        return docRef.id
    } catch (error) {
        throw error
    }
}

export const getUserDatasets = async (userId) => {
    try {
        const q = query(collection(db, 'datasets'), where('userId', '==', userId))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (error) {
        throw error
    }
}
