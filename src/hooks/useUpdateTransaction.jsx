import React from 'react'
import { db } from '../config/config'
import { updateDoc, doc } from 'firebase/firestore'

const useUpdateTransaction = () => {
    const updateTransaction = async (obj, id) => {
        try {
            const ref = doc(db, "Transactions", id)
            await updateDoc(ref, obj)

        } catch (err) {
            console.error(err)
        }
    }
    return (
        { updateTransaction }
    )
}

export default useUpdateTransaction