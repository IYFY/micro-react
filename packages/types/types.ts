export type typeType = string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type propsType = Record<string, any> | null
export type childrenType = nodeType[]

export type nodeType =
  | string
  | {
      type: typeType
      props: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any
        children: childrenType
      }
    }
