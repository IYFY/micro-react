import React from "react"
import ReactDom from "react-dom"

import "./style.css"

const list: string[] = []

function App() {
  const addHandler = () => {
    list.push("React")
    ReactDom.update()
  }
  // const removeHandler = () => {
  //   list.pop()
  //   ReactDom.update()
  // }
  console.log(
    <div>
      {list.map((item, index) => (
        <div>{item}</div>
      ))}
    </div>,
  )

  return (
    <div>
      <button id="btn" onClick={addHandler}>
        add
      </button>
      {/* <button id="btn" onClick={removeHandler}>
        remove
      </button> */}

      <div>
        {list.map((item, index) => (
          <div>
            {index}
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
export default App
