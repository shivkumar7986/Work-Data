import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='h-screen pt-6 bg-red-400 flex flex-col justify-between bg-[url(images/bgimg.png)] bg-cover bg-center'>
        <img className='w-16 ml-8 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div className=' bg-white py-5 px-10'>
          <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
          <Link to='login' className='flex justify-center bg-black text-white py-3 font-bold rounded-md w-full mt-4'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start