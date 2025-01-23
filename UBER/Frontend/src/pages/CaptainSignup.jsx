import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainSignup = () => {
  const {captain , setCaptain} = useContext(CaptainDataContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register` , captainData)

    if(response.status == 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token' , data.token)
      navigate('/captain-home')
    }

    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div className='h-screen p-7 flex flex-col justify-between'>
      <div>
        <form onSubmit={(e) => {
          handleSubmit(e)
        }} >
          <img className='w-16 mb-2 ' src='https://www.svgrepo.com/show/505031/uber-driver.svg'></img>


          <h3 className='text-base font-medium mb-2'>What's our Captain name</h3>
          <div className='flex gap-4 mb-6'>
            <input
              required
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value)
              }}
              className='bg-[#eeeeee] py-2 px-4 rounded w-1/2 placeholder:text-base border '
              type="text"
              placeholder='First name'
            />

            <input
              required
              value={lastname}
              onChange={(e) => {
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
          <h3 className='text-base font-medium mb-2'>Vehicle information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <button
            className='bg-[#111111] text-white font-semibold py-2 px-4 rounded w-full placeholder:text-base border'
          >Create Captain Account</button>
        </form>
        <p className='text-center'>Already have an account ?<Link to='/captain/login' className='text-blue-600'> Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup