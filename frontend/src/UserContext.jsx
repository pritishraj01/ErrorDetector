import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext()
function UserContext({ children }) {
    let serverUrl = "https://errordetector-backend.onrender.com"
    let [userData,setUserData]= useState(null)
    let [authLoading,setAuthLoading]= useState(true)

    let currentUser= async()=>{
        try {
            let result= await axios.get(`${serverUrl}/auth/getme`,{withCredentials:true,timeout: 10000})
            console.log(result)
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
            console.log(`current user error: ${error}`)
        }finally{
            setAuthLoading(false)
        }
    }

   const value = {
        serverUrl,
        currentUser,
        setUserData,
        userData,
        authLoading
    }

    useEffect(()=>{
        currentUser()
    },[])

    return (
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
    )
}

export default UserContext
