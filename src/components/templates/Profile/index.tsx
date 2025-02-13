import { Footer } from "../../organisms/Footer"
import { Header } from "../../organisms/Header"
import { RightSide } from "../../organisms/RightSide"

import { Wrapper } from "../Wrapper"

export const Profile = () => {
  return (
    <>
        <Wrapper>
            <Header logged = {false}/>
            <RightSide/>
        </Wrapper>
        <Footer/>
    </>
  )
}
