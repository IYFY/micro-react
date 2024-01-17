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
        if (Array.isArray(child)) {
          return child
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
        return child
      }),
    },
  }
}
