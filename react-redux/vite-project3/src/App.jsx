import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(); 
  const storeData = useSelector((state) => state);

  
  const INCREMENT = 'INCREMENT';
  const DECREMENT = 'DECREMENT';

  const countIncrement = () => {
    dispatch({ type: INCREMENT, payload: Number(number) });
    setNumber('') 
  };

  const countDecrement = () => {
    dispatch({ type: DECREMENT, payload: Number(number) });
    setNumber('')
  };

  return (
    <>
      <h1>Welcome to the React-Redux tutorial!</h1>
      <h4>Count: {storeData.count}</h4>
      <input
        type="number"
        value={number}
        placeholder='enter number'
        onChange={(e) => setNumber(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '2vw', marginTop: '2vw' }}>
        <button onClick={countIncrement}>INCREMENT</button>
        <button onClick={countDecrement}>DECREMENT</button>
      </div>
    </>
  );
}

export default App;
