import React, { useContext, useEffect  } from 'react'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({
  children
}) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const {} = useContext(UserDataContext)

  useEffect(() => {
    if (!token) {
      navigate('/login')  
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper