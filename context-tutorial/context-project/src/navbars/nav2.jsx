import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreContext from '../context/mainContext'

const nav2 = () => {
  const {setNav} = useContext(StoreContext)
  const navigate = useNavigate()

  const handleLogout = () =>{
   setNav(0);
   navigate('/')  
  }
  return (
    <div>
    <div className="nav flex items-center justify-between bg-blue-400 px-8 py-6 ">
      <h1 className='text-2xl font-bold uppercase'>Admin Panel.</h1>
      <div className='flex items-center justify-between gap-10 text-xl font-medium'>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Services</h1>
        <h1>Contact</h1>
        <button className='py-3 px-8 rounded-full bg-black text-white text-md font-medium'
        onClick={handleLogout} >Logout</button>
      </div>
    </div>
  </div>
  )
}

export default nav2