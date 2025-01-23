import React from 'react'
import {Routes ,Route } from 'react-router-dom'
import Login from './components/login'
import Admin from './components/admin'
import Coustomer from './components/coustomer'
import Adminedit from './components/adminedit'
import Showcart from './components/showcart'
import Payment from './components/payment'
import Bill from './components/bill'
import Registor from './components/registor'
import Showorders from './components/showOrders'
import Coustomerbill from './components/coustomerfindbill'
import CoustomerOrders from './components/CoustomerOrder'

const myApp = () => {
  return (
    <>
    <Routes>
        <Route exact path='/registor' element={<Registor />} ></Route>
        <Route exact path='/' element={<Login />} ></Route>
        <Route  path='/admin' element={<Admin />} ></Route>
        <Route  path='/coustomer' element={<Coustomer />} ></Route>
        <Route  path='/adminedit' element={<Adminedit />} ></Route>
        <Route  path='/showcart' element={<Showcart />} ></Route>
        <Route  path='/showcart/payment' element={<Payment />} ></Route>
        <Route  path='/showcart/bill' element={<Bill />} ></Route>
        <Route  path='/admin/showorders' element={<Showorders />} ></Route>
        <Route  path='/coustomer/showbills' element={<Coustomerbill />} ></Route>
        <Route  path='/coustomer/orders' element={<CoustomerOrders />} ></Route>
    </Routes>
    </>
  )
}

export default myApp