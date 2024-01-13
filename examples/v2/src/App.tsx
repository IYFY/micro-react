import React from "react"
import "./style.css"
import typescriptLogo from "./typescript.svg"
import viteLogo from "/vite.svg"
import logo from "/logo.jpg"
// /* @__PURE__ */ React.createElement("div", null, "11");
function Hi() {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} class="logo vanilla" alt="Vite logo" />
      </a>
      <a href="https://github.com/IYFY/micro-react" target="_blank">
        <img src={logo} class="logo " alt="micro-react logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>micro-react</h1>
      {/* <div class="card">
        <button id="counter" type="button"></button>
      </div> */}
      <p class="read-the-docs">
        Click on the Vite and MicorReact TypeScript logos to learn more
      </p>
    </div>
  )
}
export default Hi()
