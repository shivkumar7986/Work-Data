import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  
  const navigate = useNavigate();
  const {user , setUser} = useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , newUser)
      // console.log(response);

    if(response.status == 200){
      const data = response.data
      console.log(data);
      setUser(data.user)
      localStorage.setItem("token" , data.token)
      navigate('/home')
    }

    setemail('')
    setpassword('')

  }

  return (
    <div className='h-screen px-7 py-10 flex flex-col justify-between'>
      <div>
        <form onSubmit={(e) => {
          handleSubmit(e)
        }} >
          <img className='w-16 mb-10 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
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
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      <div>
        <Link to='/captain/login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold py-2 px-4 rounded w-full placeholder:text-base border'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin