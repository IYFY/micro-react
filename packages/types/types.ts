export type typeType = string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type propsType = Record<string, any> | null
export type childrenType = nodeType[]

export type nodeType = {
  type: typeType
  props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    children: childrenType
  }
}

export type fiberType = {
  type: typeType
  props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    children: childrenType
  }
  /** 当前 element 对象创建 dom 元素 */
  dom: Text | Element | null

  // 单链表树结构
  return: fiberType | null
  sibling: fiberType | null
  child: fiberType | null
  index: number
}
