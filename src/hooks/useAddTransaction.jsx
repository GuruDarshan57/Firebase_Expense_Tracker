import React from 'react'
import { db } from '../config/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useGetUserInfo } from './useGetUserInfo'
const useAddTransaction = () => {
    const { u_id } = useGetUserInfo();
    const add_transaction = async (t_description, t_amount, t_type) => {
        try {
            await addDoc(collection(db, "Transactions"), { user_id: u_id, amount: t_amount, description: t_description, type: t_type, createdAt: String(new Date()).slice(0, 24) })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        { add_transaction }
    )
}

export default useAddTransaction