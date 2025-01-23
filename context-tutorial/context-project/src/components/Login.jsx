import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../context/mainContext'
import Nav1 from '../navbars/nav1'
import Nav2 from '../navbars/nav2'
import Nav3 from '../navbars/nav3'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const { nav , setNav } = useContext(StoreContext);
  console.log(nav);

  const renderNavbar = () => {
    if (nav === 0) {
      return (
        <Nav1 />
      )
    }
    else if (nav === 1) {
      return (
        <Nav2 />
      )
    }
    else {
      return (
        <Nav3 />
      )
    }
  }

  const handleSubmit = () =>{
    if(name === "admin" && password === "admin123"){
      setNav(1)
      navigate('/admin')
      console.log(nav);
    }
    else{
      setNav(2)
      navigate('/customer')

    }
  }

  

  useEffect(() => {
    const setNav1 = ()=>{
      setNav(0)
    }
    setNav1()
  }, [])
  
  return (
    <div >
      {renderNavbar()}
      <div className='flex justify-center items-center h-[60vh] mt-6 '>
        <div className='flex flex-col   gap-4 bg-green-200 w-[30vw] px-[6vw] py-16 rounded-xl '>
          <h1 className='text-md font-medium mb-3 '>Login here.</h1>
          <input className='p-4 border border-black rounded-lg placeholder:text-black'
            type="text"
            placeholder='username'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }} />


          <input className='p-4 border border-black rounded-lg placeholder:text-black'
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }} />
          <button className='p-3 rounded-full bg-black text-white text-md font-medium'
           onClick={handleSubmit} >Login</button>
        </div>
      </div>

    </div>
  )
}

export default Login