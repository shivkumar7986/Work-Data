import { React } from 'react'
import HomePage from './components/HomePage'
import CartPage from './components/CartPage'

import { Route, Routes } from 'react-router-dom'


  function App() {
    return (
      <>
        <div>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route  path='/cart' element={<CartPage />} />
          </Routes>
        </div>
      </>
    )
  }

export default App
