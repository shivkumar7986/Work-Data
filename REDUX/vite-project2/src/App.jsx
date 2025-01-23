import React from 'react';
import {Route, Routes} from 'react-router-dom';
import FistPage from './components/page1';
import SecondPage from './components/page2';
import ChangeState from './components/chageState'

function App() {
  

  return (
    <div>
     <Routes>
      <Route exact path='/' element={<FistPage />} />
      <Route path='/second' element={<SecondPage />} />
      <Route path='/changestate' element={<ChangeState />} />
      </Routes>
    </div>
  )
}

export default App
