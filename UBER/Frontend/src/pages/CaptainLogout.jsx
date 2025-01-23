import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const CaptainLogout =  () =>{
    const navigate = useNavigate();
    const token = localStorage.getItem('CapToken')
    
    useEffect(()=>{
        const capLogout = async () =>{
            if(!token){
                console.log('no captoken found');
                navigate('/captain/login')
            }

            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout` ,{
                    headers: {
                        Authorization : `Beare ${token}`
                    }
                } )

                if(response.status == 200){
                    localStorage.removeItem("CapToken")
                    navigate('/captain/login')
                }
            }catch(error){
               console.log('error :' + error); 
               localStorage.removeItem('CapToken')
               navigate('/captain/login')
            }
            
        }

        capLogout()
    })

    
    return (
        <>
        <h1>logout</h1>
        </>
    )
}

export default CaptainLogout