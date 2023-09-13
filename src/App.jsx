import { useCallback, useEffect, useRef } from "react"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [isNumber, setIsNumber] = useState(false)
  const [isCharacter, setIsCharacter] = useState(false)
  const copyPasswordToClipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    .then(()=>{
      toast.success("Copied!")
    })
  },[password])
  const passwordRef=useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm'
    let number = '0123456789'
    let character = '~`!@#$%^&*()_+='
    if (isNumber) {
      str += number
    }
    if (isCharacter) {
      str += character
    }
    for (let index = 0; index < length; index++) {
      const element = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(element)

    }
    setPassword(pass)
  }, [length, isNumber, isNumber, setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, isCharacter, isNumber, setPassword])
  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-600 rounded-lg my-28 py-5 px-4">
        <h1 className="text-white mb-4 text-lg text-center ">Password Generator</h1>
        <div>
          <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs rounded-e-none" value={password} readOnly ref={passwordRef} /><button onClick={copyPasswordToClipboard} className="btn btn-primary rounded-s-none">Copy</button>
        </div>
        <div className=" mt-4 flex gap-x-2 text-orange-600">
          <div className="flex items-center flex-col lg:flex-row gap-x-1">
            <input type="range"
              min={6} max={32} value={length} className=" cursor-pointer" onChange={(e) => { setLength(e.target.value) }} />
            <label>Length: {length}</label>
            <div className="m-0 lg:mx-2">
              <input type="checkbox" id="number" defaultChecked={isNumber} onChange={() => {
                setIsNumber((prev) => !prev)
              }} />
              <label htmlFor="number" className="ml-1">Number</label>
            </div>
            <div className="m-0 lg:mx-2">
              <input type="checkbox" id="character" defaultChecked={isCharacter}
                onChange={() => {
                  setIsCharacter((prev) => !prev)
                }} />
              <label htmlFor="character" className="ml-1">Character</label>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer/>
    </>
  )
}

export default App
