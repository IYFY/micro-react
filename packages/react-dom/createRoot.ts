import { nodeType } from "types"
import { render } from "./render"

export function createRoot(container: Element) {
  return {
    render(node: nodeType) {
      render(node, container)
    },
  }
}
