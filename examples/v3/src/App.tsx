import React from "react"
import "./style.css"
import typescriptLogo from "./typescript.svg"
import viteLogo from "/vite.svg"
import logo from "/logo.jpg"

function Hi() {
  const Ul = (key = "0", maximum = 5) => {
    if (maximum <= 0) {
      return ""
    }
    return (
      <ul>
        {...new Array(10).fill(0).map((_item, index) => {
          return (
            <li key={`${key}_${index}`}>
              <span>{`${key}_${index}`}</span>
              {Ul(`${key}_${index}`, maximum - 1)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div>
      <h1>micro-react</h1>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://github.com/IYFY/micro-react" target="_blank">
        <img src={logo} class="logo " alt="micro-react logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
      </a>
      <div>{Ul()}</div>
    </div>
  )
}
export default Hi()
