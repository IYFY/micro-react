/**
 * TODO: 命令式渲染 <div id="root">hi</div>
 */

// 创建 div 元素并设置属性 id
const rootEl = document.createElement("div")
rootEl.setAttribute("id", "root")
// 创建 hi 文本
const textEl = document.createTextNode("")
textEl.nodeValue = "hi"

rootEl.append(textEl)
document.querySelector("body").append(rootEl)
