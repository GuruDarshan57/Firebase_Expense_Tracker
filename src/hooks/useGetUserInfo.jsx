import React from 'react'

export const useGetUserInfo = () => {
    const { u_auth, u_id, u_img, u_name } = JSON.parse(localStorage.getItem("u_info")) || {}
    return (
        { u_auth, u_id, u_img, u_name }
    )
}
