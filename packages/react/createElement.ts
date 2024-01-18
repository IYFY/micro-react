import { nodeType, typeType, propsType, childrenType } from "types"

export default function createElement(
  type: typeType,
  props: propsType,
  ...children: childrenType
): nodeType {
  return {
    type,
    props: {
      ...props,
      children: children.flatMap((child) => {
        // 解决判断渲染
        if (
          typeof child === "boolean" ||
          child === undefined ||
          child === null
        ) {
          return []
        }

        if (["string", "number"].includes(typeof child)) {
          return {
            type: "TEXT_NODE",
            props: {
              nodeValue: child,
              children: [],
            },
          }
        }

        // 解决 <><> 情况
        if (
          Object.prototype.toString.call(child) === "[object Object]" &&
          !child.type
        ) {
          return child.props.children
        }

        return child
      }),
    },
  }
}
