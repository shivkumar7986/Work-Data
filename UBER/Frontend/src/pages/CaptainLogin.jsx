import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const navigate= useNavigate();
  const {captain , setCaptain} = useContext(CaptainDataContext)

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if(response.status == 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem("CapToken" , data.token)
      navigate('/captain/home')
    }

    setemail('')
    setpassword('')

  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
    <div>
      <form onSubmit={(e) => {
        handleSubmit(e)
      }} >
        <img className='w-16 mb-2  ' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='png'></img>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>

        <input
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value)
          }}
          className='bg-[#eeeeee] py-2 px-4 rounded w-full placeholder:text-base border mb-7'
          type="email"
          placeholder='example@gmail.com'
        />

        <h3 className='text-lg font-medium mb-2'>Enter password</h3>

        <input
          required
          value={password}
          onChange={(e) => {
            setpassword(e.target.value)
          }}
          className='bg-[#eeeeee] py-2 px-4 rounded mb-7 w-full placeholder:text-base border'
          type="password"
          placeholder='password'
        />

        <button
          className='bg-[#111111] text-white font-semibold py-2 px-4 rounded w-full placeholder:text-base border'
        >Login</button>
      </form>
      <p className='text-center'>Join a fleet?<Link to='/captain/signup' className='text-blue-600'> Register as a Captain</Link></p>
    </div>

    <div>
      <Link to='/login' className='bg-[#369fb4] flex items-center justify-center text-white font-semibold py-2 px-4 rounded w-full placeholder:text-base border'>Sign in as User</Link>
    </div>
  </div>
  )
}

export default CaptainLogin