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
      children,
    },
  }
}
