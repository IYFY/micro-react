import React from "react"
import "./style.css"

function App() {
  const handler = () => {
    console.log("onClick")
  }

  return <button onClick={handler}>button</button>
}
export default App
