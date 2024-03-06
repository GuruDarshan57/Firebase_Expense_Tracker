import { useEffect, useState } from "react";
import {
    query,
    collection,
    where,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../config/config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
    });

    const transactionCollectionRef = collection(db, "Transactions");
    const { u_id } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("user_id", "==", u_id),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });

                    if (data.type === "expense") {
                        totalExpenses += Number(data.amount);
                    } else {
                        totalIncome += Number(data.amount);
                    }

                });

                setTransactions(docs);

                let balance = totalIncome - totalExpenses;
                setTransactionTotals({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,
                });
            });
        } catch (err) {
            console.error(err);
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return { transactions, transactionTotals };
};