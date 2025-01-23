
import Counter from './components/couter'
import {useDispatch} from 'react-redux'

function App() {
 const dispatch = useDispatch();

  return (
    <>
    <Counter />
    <div style={{display:'flex', gap:'2vw'}}>
    <button onClick={(e)=> dispatch({type: "INCREMENT"})}>Increment</button>
    <button onClick={(e)=> dispatch({type:"DECREMENT"})}>Decrement</button>
    </div>
    </>
  )
}

export default App
