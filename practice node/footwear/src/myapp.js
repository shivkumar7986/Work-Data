import React from 'react'
import Page1 from './pages/home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import Registor from './pages/registor';
import Services from './pages/services';
import About from './pages/about';
import Admin from './pages/admin';
import Adminedit from './pages/adminedit'
import ViewProduct from './pages/viewproduct'
// import Productpage from './pages/productpage'

const myapp = () => {
  return (
    <>
      <Routes >
        <Route exact path='/' element={<Page1 />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/registor' element={<Registor />} ></Route>
        <Route path='/services' element={<Services />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/admin' element={<Admin />} ></Route>
        <Route path='/adminedit' element={<Adminedit />} ></Route>
        <Route path='/viewproduct/:id' element={<ViewProduct />} />

      </Routes>
    </>
  )
}

export default myapp