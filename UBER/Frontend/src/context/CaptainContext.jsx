import React, { createContext, useContext, useState } from 'react'

export const CaptainDataContext = createContext();



const CaptainContext = ({children}) => {
    const [captain , setCaptain ] = useState(null);
    const [isLoding , setIsLoding] = useState(false);
    const [error , setError] = useState(null);  

    const updateCaptain = (captainData)=>{
        setCaptain(captainData);
    }

    const value = {
        captain ,
        setCaptain,
        isLoding,
        setIsLoding,
        error , 
        setError,
        updateCaptain
    };

  return (
    <div>
        <CaptainDataContext.Provider value={value}>
        {children}
        </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext