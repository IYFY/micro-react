import React from "react"
import "./style.css"
import typescriptLogo from "./typescript.svg"
import viteLogo from "/vite.svg"
import logo from "/logo.jpg"

function Page(props) {
  return props.children
}

function Main() {
  return (
    <main>
      main
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo vanilla" alt="Vite logo" />
        </a>
        <a href="https://github.com/IYFY/micro-react" target="_blank">
          <img src={logo} class="logo " alt="micro-react logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            src={typescriptLogo}
            class="logo vanilla"
            alt="TypeScript logo"
          />
        </a>
        <p>This is the main content of the page.</p>
      </div>
    </main>
  )
}

function Header() {
  return (
    <header>
      <h1>micro-react</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 My Website</p>
    </footer>
  )
}

function App() {
  return (
    <Page>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </Page>
  )
}
export default App
