import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify'

export const AppContent = createContext()

export const AppContextProvider = (props) => {
    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [IsLoggedin, setIsLoggedin] = useState(false)
    const [userData, setuserData] = useState(false)
    console.log('Context initialized', { backendUrl, IsLoggedin, userData })


    const getAuthState = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Une erreur s'est produite");

        }
    }

    const getUserData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setuserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Une erreur s'est produite");
                
        }
    }

    useEffect(()=>{
       getAuthState()
    },[])

    const value = {
        backendUrl,
        IsLoggedin,setIsLoggedin,
        userData,setuserData,
        getUserData
    }
    return (
        <AppContent.Provider value={value} >
            {props.children}
        </AppContent.Provider>
    )
}