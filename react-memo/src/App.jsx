import React, { useState } from "react";

const Counter = React.memo(({count})=>{
  const [first, setfirst] = useState(0)
  return (
    <>
    <h1>Count : {count} </h1>
    {first}
    <button onClick={()=> setfirst(first + 2)} >checkRender</button>
    {console.log("child")}
    </>
  )
})

const App= () =>{
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here" />
      {console.log('parent')}
    </div>
  );
}

export default App;
