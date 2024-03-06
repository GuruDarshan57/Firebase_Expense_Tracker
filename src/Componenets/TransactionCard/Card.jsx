import React, { useEffect, useState } from 'react'
import './index.css'
import useDeleteTransaction from '../../hooks/useDeleteTransaction'
import useUpdateTransaction from '../../hooks/useUpdateTransaction'

const Card = (props) => {

    const { updateTransaction } = useUpdateTransaction()
    const { deleteTransaction } = useDeleteTransaction()
    const [id, setId] = useState("")
    const [udes, setUdes] = useState("")
    const [uamo, setAmo] = useState("")
    return (
        <div className="card">
            <div className="c_con">
                <div className={`card_con ${props.data.type === 'expense' ? 'c_ex' : 'c_in'}`}>
                    <div className='card_top'>
                        <div className="c_amount">
                            <span>₹ {props.data.amount}</span>
                        </div>
                        <div className={`c_type ${props.data.type === 'expense' ? 'c_e' : 'c_i'}`}>
                            {props.data.type}
                        </div>
                    </div>
                    <div className="card_bottom">
                        <div className="c_des">
                            <span>{props.data.description}</span>
                        </div>
                        <div className="c_timestamp">
                            <span> {props.data.createdAt}</span>
                        </div>
                    </div>
                </div>
                <div className='c_uti'>
                    <i onClick={() => {
                        deleteTransaction(props.data.id)
                    }} className="fa-solid fa-trash"></i>
                    <i onClick={(e) => {
                        id === props.data.id ? setId("") : setId(props.data.id)
                    }} className="fa-solid fa-pen-to-square"></i>
                </div>
            </div>
            <div className={`card_update ${props.data.id === id ? "c_edit" : ""}`}>
                <input type="text" placeholder='Description...' value={udes} onChange={(e) => { setUdes(e.target.value) }} />
                <input type="text" placeholder='Amount...' value={uamo} onChange={(e) => { setAmo(e.target.value) }} />
                <button onClick={() => {
                    if (udes === "" || uamo === "") { alert("Please Fill Fiels to be Changed") }
                    else {
                        updateTransaction({ description: udes, amount: uamo }, props.data.id);
                        setUdes("");
                        setAmo("");
                        setId("")
                    }
                }}>Update</button>
            </div>
        </div >

    )
}

export default Card