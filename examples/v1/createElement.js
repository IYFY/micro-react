/**
 * TODO: 声明式渲染 <div id="root">hi</div>
 */

// 创建元素
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}

// 渲染函数
function render(node, container) {
  const el =
    node.type === "TEXT_NODE"
      ? document.createTextNode("")
      : document.createElement(node.type)

  Object.entries(node.props).forEach(([key, value]) => {
    if (key === "children") {
      value.forEach((child) => render(child, el))
      return
    }
    el[key] = value
  })

  container.append(el)
}

const vdom = createElement(
  "div",
  { id: "root" },
  createElement("TEXT_NODE", { nodeValue: "hi" }),
  createElement("TEXT_NODE", { nodeValue: " document" }),
)

render(vdom, document.body)
