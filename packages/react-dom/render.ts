import { nodeType, fiberType } from "types"

let nextUnitOfWork: fiberType | undefined | null
let rootFiber: fiberType | null // 根 fiber 节点

export function render(node: nodeType, container: Element) {
  nextUnitOfWork = {
    type: node.type,
    props: node.props,

    // 单链表树结构
    return: null,
    sibling: null,
    child: null,
    index: 0,
    dom: container,
  }
  rootFiber = nextUnitOfWork
}

function createDom(work: fiberType) {
  return work.type === "TEXT_NODE"
    ? document.createTextNode(work.props.nodeValue)
    : document.createElement(work.type)
}

function updateProps(dom: Text | Element, work: fiberType) {
  if (work.type === "TEXT_NODE") return
  Object.entries(work.props).forEach(([key, value]) => {
    if (key !== "children") {
      ;(dom as Element).setAttribute(key, value)
    }
  })
}

function performUnitOfWork(work: fiberType) {
  if (work.child?.dom) {
    return work.sibling ?? work.return
  }

  if (!work.dom) {
    const el = createDom(work)
    work.dom = el
    updateProps(el, work)
  }

  // 2、设置链表指针
  const children = work.props.children
  let previousSibling: fiberType
  children.forEach((child, index) => {
    const fiber: fiberType = {
      //
      type: child.type,
      props: child.props,
      dom: null,
      // 单链表树结构
      return: work,
      sibling: null,
      child: null,
      index: index,
    }

    if (index === 0) {
      work.child = fiber
    } else {
      previousSibling.sibling = fiber
    }
    previousSibling = fiber
  })

  // 3、返回下一个 work
  return work.child ?? work.sibling ?? work.return
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
  commitWork(rootFiber.child!)
  rootFiber = null
}
// 挂载递归
function commitWork(fiber: fiberType) {
  if (!fiber) return
  const dom = fiber!.return!.dom as Element
  dom.append(fiber.dom!)
  commitWork(fiber.child!)
  commitWork(fiber.sibling!)
}

requestIdleCallback(workLoop)
