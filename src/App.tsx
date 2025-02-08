import { Footer } from "./components/organisms/Footer"
import { Header } from "./components/organisms/Header"
import { Main } from "./components/organisms/Main"
import { Wrapper } from "./components/templates/Wrapper"

function App() {


  return (
    <>
      <Wrapper>
        <Header/>
        <Main/>
      </Wrapper>
      <Footer/>
    </>
  )
}

export default App
