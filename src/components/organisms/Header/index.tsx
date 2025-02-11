import { Logo } from "../../atoms/Icons/Logo"
import { Nav } from "../../molecules/Nav"
import { MobileMenu } from "../../molecules/MobileMenu"
import { SteamButton } from "../../molecules/SteamButton"

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 px-4 pb-7 container mx-auto">
      <Logo/>
      <Nav/>
      <SteamButton />
      <MobileMenu />
    </header>
  )
}
