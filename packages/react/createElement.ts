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
      children: children.map((child) =>
        Object.prototype.toString.call(child) === "[object Object]"
          ? child
          : {
              type: "TEXT_NODE",
              props: {
                nodeValue: child,
                children: [],
              },
            },
      ),
    },
  }
}
