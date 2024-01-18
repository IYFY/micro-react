import reactDom from "react-dom"

type setState<T> = (value: T | ((prevState: T) => T)) => void

// TODO 实现 useState 在组件中执行一次
function useState<T = never>(initState: T): [T, setState<T>] {
  let state = initState
  const update = reactDom.update()
  const setState: setState<T> = (value) => {
    const prevState = state

    if (typeof value === "function") {
      state = (value as (prevState: T) => T)(prevState)
    } else {
      state = value
    }

    // 触发更新
    if (prevState !== state) {
      update()
    }
  }

  return [state, setState]
}

export default useState
