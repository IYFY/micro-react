export type domType = Text | HTMLElement

// 使用接口声明函数类型
export type typeType = undefined | string | FC
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type childrenType = (nodeType | any)[]

export type propsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  children: childrenType
}

export interface FC<T = propsType> {
  (props?: T): Element
}
export type nodeType = {
  type: typeType
  props: propsType
}

export type fiberType = {
  type: typeType
  props: propsType
  /** 当前 element 对象创建 dom 元素 */
  dom: domType | null

  // 单链表树结构
  return: fiberType | null
  sibling: fiberType | null
  child: fiberType | null
  index: number

  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any

  //
  effectTag: "Placement" | "Update" | "Deletion"
  alternate: fiberType | null
}
