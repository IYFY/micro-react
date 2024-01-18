import { nodeType, fiberType, FC, childrenType, propsType } from "types"

let nextUnitOfWork: fiberType | undefined | null
let workInRootFiber: fiberType | null // 根 fiber 节点
let currentRootFiber: fiberType | null
let deletions: fiberType[] = []

function createFiber(node: nodeType): fiberType {
  return {
    type: node.type,
    props: node.props,

    // 单链表树结构
    return: null,
    sibling: null,
    child: null,
    index: 0,
    dom: null,

    //
    effectTag: "Placement",
    alternate: null,
  }
}

function createDom(work: fiberType) {
  return work.type === "TEXT_NODE"
    ? document.createTextNode("")
    : document.createElement(work.type as string)
}

function updateProps(
  dom: Text | HTMLElement,
  newProps: propsType,
  oldProps?: propsType,
) {
  // new 有, old 有，值不同 || new 有, old 无， 添加
  const addKeys = Object.keys(newProps ?? {}).filter((key) => {
    if (key === "children") return false
    if (oldProps && key in oldProps) {
      return newProps[key] !== oldProps![key]
    }
    return true
  })
  // new 无 , old 有 删除
  const removeKeys = Object.keys(oldProps ?? {}).filter((key) =>
    key === "children" ? false : !(key in newProps),
  )

  addKeys.forEach((key) => {
    if (key.startsWith("on") && typeof newProps[key] === "function") {
      oldProps &&
        oldProps[key] &&
        dom.removeEventListener(key.slice(2).toLowerCase(), oldProps[key])
      dom.addEventListener(key.slice(2).toLowerCase(), newProps[key])
      return
    }

    if (dom.nodeType === Node.TEXT_NODE) {
      dom.nodeValue = newProps[key]
    } else {
      ;(dom as HTMLElement).setAttribute(key, newProps[key])
    }
  })

  removeKeys.forEach((key) => {
    if (key.startsWith("on") && typeof oldProps![key] === "function") {
      dom.removeEventListener(key.slice(2).toLowerCase(), oldProps![key])
    } else {
      ;(dom as HTMLElement).removeAttribute(key)
    }
  })
}

export function render(node: nodeType, container: HTMLElement) {
  workInRootFiber = createFiber(node)
  workInRootFiber.dom = container
  nextUnitOfWork = workInRootFiber
}

export function update() {
  const node: nodeType = {
    type: currentRootFiber!.type,
    props: currentRootFiber!.props,
  }

  workInRootFiber = createFiber(node)
  workInRootFiber.dom = currentRootFiber!.dom
  workInRootFiber.alternate = currentRootFiber

  nextUnitOfWork = workInRootFiber
}

// 2、设置链表指针
function reconcileChildren(work: fiberType, children: childrenType) {
  let previousSibling: fiberType
  let oldFiber = work.alternate?.child

  children?.forEach((child, index) => {
    const fiber: fiberType = createFiber(child)
    fiber.return = work
    fiber.index = index

    const isSameType = oldFiber && oldFiber.type === child.type
    // 复用 dom
    if (isSameType) {
      fiber.dom = oldFiber!.dom
      fiber.alternate = oldFiber!
      fiber.effectTag = "Update"
    } else {
      oldFiber && deletions.push(oldFiber) // 删除 变更对应的节点
    }

    //  当前 children 遍历对应的旧 fiber， 通过 oldFiber 的 sibling 获取
    if (oldFiber) {
      oldFiber = oldFiber?.sibling
    }

    if (index === 0) {
      work.child = fiber!
    } else {
      previousSibling.sibling = fiber!
    }
    previousSibling = fiber!
  })

  while (oldFiber) {
    // 删除 多余兄弟节点
    oldFiber && deletions.push(oldFiber)
    oldFiber = oldFiber?.sibling
  }
}

function updateFunctionComponent(work: fiberType) {
  // **
  const fun = work.type as FC
  const result = fun(work.props)
  const children = Array.isArray(result) ? result : [result]
  reconcileChildren(work, children)
}

function updateHostComponent(work: fiberType) {
  if (!work.dom) {
    const el = (work.dom = createDom(work))
    updateProps(el, work.props)
  }
  reconcileChildren(work, work.props?.children)
}

function performUnitOfWork(work: fiberType) {
  const isFunctionComponent = typeof work.type === "function"
  // debugger

  if (isFunctionComponent) {
    updateFunctionComponent(work)
  } else {
    updateHostComponent(work)
  }

  // 3、返回下一个 work
  if (work.child) {
    return work.child
  }

  let newReturn: fiberType | null = work
  while (newReturn && !newReturn!.sibling) {
    newReturn = newReturn.return
  }

  return newReturn?.sibling
}

function workLoop(deadline: IdleDeadline) {
  let shouldYield = false

  while (!shouldYield && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextUnitOfWork && workInRootFiber) {
    // 统一 commit
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

function commitRoot() {
  if (!workInRootFiber) return

  // 删除
  deletions.forEach(commitDelete)
  deletions = []

  // 添加变更
  commitWork(workInRootFiber, workInRootFiber.child!)
  currentRootFiber = workInRootFiber
  workInRootFiber = null
}

// 挂载递归
function commitWork(parentFiber: fiberType, fiber?: fiberType | null) {
  if (!fiber) return

  if (fiber.effectTag === "Update") {
    updateProps(fiber.dom!, fiber.props, fiber.alternate?.props)
  } else if (fiber.effectTag === "Placement") {
    fiber.dom && (parentFiber.dom as HTMLElement).append(fiber.dom!)
  }

  commitWork(fiber.dom ? fiber : parentFiber, fiber.child!)
  commitWork(parentFiber, fiber.sibling!)
}

function commitDelete(fiber: fiberType) {
  if (!fiber) return

  if (fiber.dom) {
    fiber.dom.remove()
  } else {
    fiber.child && commitDelete(fiber.child)
  }
}

requestIdleCallback(workLoop)
