import { Logo } from "../../atoms/Logo"
import {SteamButton } from "../../molecules/SteamButton"
import { Nav } from "../../molecules/Nav"

export const Header = () => {
  return (
    <section className="flex items-center justify-between gap-4">
        <Logo/>
        <Nav/>
        <SteamButton />
    </section>
  )
}
