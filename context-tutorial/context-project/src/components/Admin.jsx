import React, { useContext, useEffect } from 'react'
import Nav1 from '../navbars/nav1'
import Nav2 from '../navbars/nav2'
import Nav3 from '../navbars/nav3'
import StoreContext from '../context/mainContext'

const Admin = () => {

  const {nav , setNav} = useContext(StoreContext)
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

  
  return (
    <div className='' >
      {renderNavbar()}
      <h1 className='text-2xl font-medium text-center mt-10'>Welocome to Admin page.</h1>
    </div>
  )
}

export default Admin