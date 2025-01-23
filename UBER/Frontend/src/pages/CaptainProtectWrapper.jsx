import React , {useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('CapToken')

    useEffect(() => {
      if(!token){
        navigate('/captain/login')
      }
    }, [])
    

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectWrapper