import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [serverTime, setServerTime] = useState<string>("");

  useEffect(() => {
    fetch("/api/datetime")
      .then(res => res.json())
      .then(data => setServerTime(data.now));
  }, []);

  return (
    <>
      <h1>{serverTime}</h1>
    </>
  )
}

export default App
