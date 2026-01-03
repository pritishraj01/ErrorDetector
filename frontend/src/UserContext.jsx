import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext()
function UserContext({ children }) {
    let serverUrl = "https://errordetector-backend.onrender.com"
    let [userData,setUserData]= useState("")

    let currentUser= async()=>{
        try {
            let result= await axios.get(`${serverUrl}/auth/getme`,{withCredentials:true})
            console.log(result)
            setUserData(result.data)
        } catch (error) {
            console.log(`current user error: ${error}`)
        }
    }

   const value = {
        serverUrl,
        currentUser,
        setUserData,
        userData
    }

    useEffect(()=>{
        currentUser()
    },[])

    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default UserContext
