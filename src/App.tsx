import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const refPass = useRef<HTMLInputElement | null>(null)
  const [length, setLength] = useState(6);
  const [passaward, setPassaward] = useState("");
  console.log(passaward, 'passsword')
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacters] = useState(false);

  const generatePassaeard = useCallback(() => {
    let pas: string = "";
    console.log(pas)
    let str: string = "ABEDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber) str += '123456789'
    if(isCharacter) str += '@#$^&*?><<+_-'
    for (let i = 0; i <= length; i++) {
      let randomPas = Math.floor(Math.random() * str.length + 1 ) 
      pas += str.charAt(randomPas)    
    }
    setPassaward(pas)
  }, [length, isCharacter, isNumber, setPassaward]);
  
  
  useEffect(() => {
    generatePassaeard()
   
  }, [length, isCharacter, isNumber, generatePassaeard])

  const copyInputText = useCallback(() =>{
    if (refPass.current) {
      refPass.current.select();
      window.navigator.clipboard.writeText(passaward);
    }
  }, [passaward] ) 
  

  return (
    <>
      <div className="main">
        <div className="input_section">
          <input
            ref={refPass}
            type="text"
            value={passaward}
            onChange={(e) => setPassaward(e.target.value)}
          />
          <button onClick={copyInputText}>Copy</button>
        </div>
        <div className="selected_values">
          <div className="inner">
            <input
              type="range"
              min={6}
              max={70}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label htmlFor="length">Length {length}</label>
          </div>
          <div className="inner">
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={() => setIsNumber((prev) => !prev)}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="inner">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={isCharacter}
              onChange={() => setIsCharacters((prev) => !prev)}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
