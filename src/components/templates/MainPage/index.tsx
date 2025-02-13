import { Footer } from "../../organisms/Footer"
import { Header } from "../../organisms/Header"
import { Main } from "../../organisms/Main"
import { Wrapper } from "../Wrapper"

export const MainPage = () => {
  return (
    <>
        <Wrapper>
            <Header logged = {true} />
            <Main/>
        </Wrapper>
        <Footer/>
    </>
  )
}
