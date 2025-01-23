import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'


import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptianHome'
import CaptainProtectWrapper from './pages/captainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'


const App = () => {


  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain/login' element={<CaptainLogin />} />
        <Route path='/captain/signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path='/captain/home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />

        <Route path='/captain/logout' element={<CaptainLogout />} />

      </Routes>


    </div>
  )
}

export default App


