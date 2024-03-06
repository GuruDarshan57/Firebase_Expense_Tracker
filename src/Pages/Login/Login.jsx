import React from 'react'
import { auth, provider } from '../../config/config'
import { signInWithPopup } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import bgv from './Assets/login_bg.mp4'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import './index.css'
const Login = () => {
    const { u_auth } = useGetUserInfo()
    const navigate = useNavigate();
    const sign_in = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            const user_data = {
                u_id: res.user.uid,
                u_img: res.user.photoURL,
                u_name: res.user.displayName,
                u_auth: true
            }
            localStorage.setItem("u_info", JSON.stringify(user_data))
            navigate("/expense_tracker")
        } catch (err) {
            console.error(err)
        }
    }
    if (u_auth) {
        return <Navigate to="/expense_tracker"></Navigate>
    }
    return (
        <div className="login">
            <video src={bgv} autoPlay muted loop />
            <div className="login_con">
                <h1>Track All Your Expenses</h1>
                <p>With <span style={{ color: "red" }}>Expense-Tracker</span> <i className="fa-solid fa-wallet" style={{ color: "#63E6BE" }}></i></p>
                <button onClick={sign_in}>Log in With Google</button>
            </div>
        </div>
    )
}

export default Login