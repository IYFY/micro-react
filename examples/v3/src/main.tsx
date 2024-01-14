// 实现的 mini react 某些方法并仿照 react 使用

import ReactDom from "react-dom"

import App from "./App"

ReactDom.createRoot(document.querySelector("#root")!).render(App)
