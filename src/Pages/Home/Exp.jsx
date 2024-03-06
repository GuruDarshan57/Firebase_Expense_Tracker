import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { auth } from '../../config/config'
import { signOut } from 'firebase/auth'
import useAddTransaction from '../../hooks/useAddTransaction'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import './index.css'
import Card from '../../Componenets/TransactionCard/Card'
import { useGetTransactions } from '../../hooks/useGetTransactions'

const Exp = () => {
    const { transactions, transactionTotals } = useGetTransactions();
    const navigate = useNavigate()
    const { add_transaction } = useAddTransaction()
    const { u_img, u_id, u_name, u_auth } = useGetUserInfo()
    const [des, setDes] = useState("");
    const [amo, setAmo] = useState("");
    const [type, setType] = useState("income")
    const [show, setShow] = useState("none");
    const sign_out = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            navigate("/")
        }
        catch (err) {
            console.error(err)
        }
    }
    const submit = () => {
        if (des !== "" && amo !== "") {
            add_transaction(des, amo, type);
            setAmo(""); setDes("");
            setShow("inline");
            setTimeout(() => { setShow("none") }, 2000);
        }
        else {
            alert("Enter Description and Amount")
        }
    }
    if (u_auth != true) {
        return <Navigate to="/" />
    }
    return (
        <div className="exp">
            <div className="exp_con">
                <div className="exp_nav">
                    <div className="exp_nav_con">
                        <h1>Expense Tracker</h1>
                        <div>
                            <img src={u_img} alt="" />
                            <span>{u_name}</span>
                            <button onClick={sign_out}>Sign Out</button>
                        </div>
                    </div>
                </div>
                <div className="financials">
                    <div className="fv">
                        <p>Balance : <span className='amount'>₹ {transactionTotals.balance}</span></p>
                        <p style={{ color: "red" }}>Expense : <span className='amount'>₹ {transactionTotals.expenses}</span></p>
                        <p id='sp' style={{ color: "yellowgreen" }}> Income  : <span className='amount'>₹ {transactionTotals.income}</span></p>
                        <div className='add_transaction'>
                            <h2>ADD TRANSACTION</h2>
                            <input type="text" placeholder='Description' value={des} onChange={(e) => { setDes(e.target.value) }} />
                            <input type="text" placeholder='Amount' value={amo} onChange={(e) => { setAmo(e.target.value) }} />
                            <div>
                                <label htmlFor="exp">Expense</label>
                                <input type="radio" name="expense" id="exp" checked={type === 'expense'} value="expense" onChange={(e) => { setType(e.target.value) }} />
                                <label htmlFor="inc">Income</label>
                                <input type="radio" name="income" id="inc" checked={type === 'income'} value="income" onChange={(e) => { setType(e.target.value) }} />
                            </div>
                            <div className="eb">
                                <button onClick={submit}>Add Transaction</button>
                                <p style={{ display: `${show}` }}>Succesfully Added</p>
                            </div>
                        </div>
                    </div>
                    <div className="history">
                        <h2>TRANSACTIONS</h2>
                        <div className="history_con">
                            {transactions.length != 0 ? transactions.map((ele) => (
                                <Card key={ele.id} data={ele} />
                            )) : <h3 style={{ color: "red" }}>No Transactions to Show ;)</h3>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exp