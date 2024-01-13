import { nodeType } from "types"

export function render(node: nodeType, container: Element) {
  let el
  if (typeof node === "string") {
    el = document.createTextNode(node)
  } else {
    el = document.createElement(node.type)
    for (const key in node.props) {
      if (key === "children") {
        const value = node.props[key]
        value.forEach((child) => render(child, el!))
        continue
      }
      el.setAttribute(key, node.props[key])
    }
  }
  container.append(el)
}
