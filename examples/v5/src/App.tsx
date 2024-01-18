import React from "react"
import ReactDom from "react-dom"

import "./style.css"

const DivCom = () => {
  return <div> div 元素 1 </div>
}
const PCom = () => {
  return <p> p 元素 1 </p>
}
const list: string[] = []
const ListCom = () => {
  const update = ReactDom.update()
  const addHandler = () => {
    list.push("React")
    update()
  }
  const removeHandler = () => {
    list.pop()
    update()
  }
  return (
    <div>
      <button id="btn" onClick={addHandler}>
        add
      </button>
      <button id="btn" onClick={removeHandler}>
        remove
      </button>

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
let switchFlag = true
const App = () => {
  const update = ReactDom.update()
  const handle = () => {
    switchFlag = !switchFlag
    update()
  }

  return (
    <div>
      {/* 渲染切换 */}
      <button onClick={handle}>切换</button>
      {switchFlag ? (
        <>
          <DivCom />
          <div>div 元素 2</div>
          <div>div 元素 3</div>
          <div>div 元素 4</div>
        </>
      ) : (
        <>
          <PCom />
          <p>p 元素 2</p>
        </>
      )}
      {/* 判断渲染 */}
      <div>{!switchFlag && <ListCom />}</div>
      <div>{undefined && <ListCom />}</div>
      <div>{null && <ListCom />}</div>
      <div>{0 && <ListCom />}</div>
    </div>
  )
}

export default App
