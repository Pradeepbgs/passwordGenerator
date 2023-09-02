import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';


function App() {

  const [Length, setLength] = useState(8);
  const [NumberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");


  // useref for copy paste to clipboard 
   const passwordRef = useRef(null);


   const copyPaste = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,Length)
      window.navigator.clipboard.writeText(Password)

   },[Password])


  const PasswordGenerator = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(NumberAllowed) str += "0123456789";

    if(CharacterAllowed) str += "`@#$%^&/?`"

    for(let i =1; i<= Length; i++){
      let char = Math.floor( Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass)

  },[Length, NumberAllowed, CharacterAllowed, setPassword])


useEffect(()=>{
  PasswordGenerator()
},[Length, NumberAllowed, CharacterAllowed, PasswordGenerator] )

  return (
    <>
    <div className='container'>
      <h1>password generator</h1>
      <div className='input-container'>
      <input 
      type="text"
      value={Password}
      placeholder="password"
      ref={passwordRef}
      readOnly
      />
      <button
      onClick={copyPaste}
      >COPY</button>
      </div>

      <div className='last-container'>
        <div className='input-cont'>
          <input 
          type="range"
          min={6}
          max={40}
          value={Length} 
          onChange={(event)=>{setLength(event.target.value)}}
          />
          <label htmlFor="">Length : {Length}</label>
        </div>

        <div className='input-cont'>
          <input 
          type="checkbox" 
          defaultChecked={NumberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed( (prevValue) =>!prevValue )
          }}
          />
          <label>Numbers</label>
        </div>

        <div className='input-cont'>
          <input 
          type="checkbox" 
          defaultChecked={CharacterAllowed}
          id='characterInput'
          onChange={() =>{
            setCharacterAllowed((prevValue) => !prevValue )
          }}
          />
          <label htmlFor="">Characters</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
