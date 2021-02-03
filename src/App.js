import React, {useState} from 'react'
import Waiting from './components/Waiting';
import Login from './components/Login';

function App() {
  const [start, setStart] = useState(false);
  
  function onClickHandler(){
    setStart(true);
  }

  return (
    <div>
      {start ? <Waiting/> : <Login isStart={onClickHandler}/>}
    </div>
  )
  
}

export default App
