import React from "react"
import reactDom from "react-dom"
import "./style.css"
let fooCount = 0
const Foo = () => {
  console.log("render Foo")
  const update = reactDom.update()
  const add = () => {
    fooCount += 1
    update()
  }
  return (
    <div>
      Foo
      <button onClick={add}>{fooCount}</button>
    </div>
  )
}
let barCount = 0
const Bar = () => {
  console.log("render Bar")
  const update = reactDom.update()
  const add = () => {
    barCount += 1

    update()
  }
  return (
    <div>
      Bar
      <button onClick={add}>{barCount}</button>
    </div>
  )
}

let appCount = 0
const App = () => {
  console.log("render App")
  const update = reactDom.update()
  const add = () => {
    appCount += 1
    update()
  }

  return (
    <div>
      <button onClick={add}>{appCount}</button>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  )
}

export default App
