import React from 'react'
import { db } from '../config/config'
import { deleteDoc, doc, collection } from 'firebase/firestore'

const useDeleteTransaction = () => {
    const deleteTransaction = async (id) => {
        try {
            const ref = doc(db, "Transactions", id)
            console.log("hi")
            await deleteDoc(ref)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        { deleteTransaction }
    )
}

export default useDeleteTransaction