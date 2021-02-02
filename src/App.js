import React, {useState} from 'react'
import Waiting from './components/Waiting';


function App() {
  const [start, setStart] = useState(false);
  
  function onClickHandler(){
    setStart(true);
  }

  return (
    <div>
      {start ? <Waiting/> : <button onClick={onClickHandler}>let's get it</button>}
    </div>
  )
  
}

export default App
