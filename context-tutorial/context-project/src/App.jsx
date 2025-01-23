import React from 'react'
import Admin from './components/admin'
import Customer from './components/customer'
import Login from './components/login'
import { Routes, Route } from 'react-router-dom'

import { NavContext } from './context/mainContext'

const App = () => {
  return (
    <div>
      <NavContext>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </NavContext>
    </div>
  )
}

export default App