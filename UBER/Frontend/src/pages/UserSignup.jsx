import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  

  const navigate = useNavigate();
  const {user , setUser} = React.useContext(UserDataContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
   const newUser = {
    fullname:{
      firstname:firstname,
    lastname: lastname,
    },
    email: email,
    password: password,
   }
   
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` , newUser)
   
   if(response.status == 201){
    const data = response.data

    setUser(data.user)
    localStorage.setItem("token" , data.token)
    
    navigate('/home')
   }

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')

  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <form onSubmit={(e) => {
          handleSubmit(e)
        }} >
          <img className='w-16 mb-10 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>


          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              value={firstname}
              onChange={(e)=>{
                setFirstname(e.target.value)
              }}
              className='bg-[#eeeeee] py-2 px-4 rounded w-1/2 placeholder:text-base border '
              type="text"
              placeholder='First name'
            />

            <input
              required
              value={lastname}
              onChange={(e)=>{
                setLastname(e.target.value)
              }}
              className='bg-[#eeeeee] py-2 px-4 rounded w-1/2 placeholder:text-base border '
              type="text"
              placeholder='Last name'
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email</h3>

          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] py-2 px-4 rounded w-full placeholder:text-base border mb-6'
            type="email"
            placeholder='example@gmail.com'
          />

          <h3 className='text-base font-medium mb-2'>Enter password</h3>

          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[#eeeeee] py-2 px-4 rounded mb-7 w-full placeholder:text-base border'
            type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111111] text-white font-semibold py-2 px-4 rounded w-full placeholder:text-base border'
          >Create Account</button>
        </form>
        <p className='text-center'>Already have an account ?<Link to='/login' className='text-blue-600'> Login here</Link></p>
      </div>

      <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
      Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup