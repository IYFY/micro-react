import { nodeType, fiberType, FC, childrenType } from "types"

let nextUnitOfWork: fiberType | undefined | null
let rootFiber: fiberType | null // 根 fiber 节点

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
  }
}

function createDom(work: fiberType) {
  return work.type === "TEXT_NODE"
    ? document.createTextNode(work.props.nodeValue)
    : document.createElement(work.type as string)
}

export function render(node: nodeType, container: Element) {
  nextUnitOfWork = createFiber(node)
  nextUnitOfWork.dom = container
  rootFiber = nextUnitOfWork
}

function updateProps(dom: Text | Element, work: fiberType) {
  if (work.type === "TEXT_NODE") return
  Object.entries(work.props).forEach(([key, value]) => {
    if (key !== "children") {
      ;(dom as Element).setAttribute(key, value)
    }
  })
}

// 2、设置链表指针
function initChildren(work: fiberType, children: childrenType) {
  let previousSibling: fiberType

  children.forEach((child, index) => {
    const fiber: fiberType = createFiber(child)
    fiber.return = work
    fiber.index = index

    if (index === 0) {
      work.child = fiber
    } else {
      previousSibling.sibling = fiber
    }
    previousSibling = fiber
  })
}

function updateFunctionComponent(work: fiberType) {
  const fun = work.type as FC
  const result = fun(work.props)
  const children = Array.isArray(result) ? result : [result]
  initChildren(work, children)
}

function updateHostComponent(work: fiberType) {
  if (!work.dom) {
    const el = (work.dom = createDom(work))
    updateProps(el, work)
  }
  initChildren(work, work.props.children)
}

function performUnitOfWork(work: fiberType) {
  const isFunctionComponent = typeof work.type === "function"

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

  if (!nextUnitOfWork && rootFiber) {
    // 统一 commit
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

function commitRoot() {
  if (!rootFiber) return
  commitWork(rootFiber, rootFiber.child!)
  rootFiber = null
}

// 挂载递归
function commitWork(parentFiber: fiberType, fiber?: fiberType | null) {
  if (!fiber) return

  fiber.dom && (parentFiber.dom as Element).append(fiber.dom!)

  commitWork(fiber.dom ? fiber : parentFiber, fiber.child!)
  commitWork(parentFiber, fiber.sibling!)
}

requestIdleCallback(workLoop)
