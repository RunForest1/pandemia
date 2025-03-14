import { Logo } from "../../atoms/Icons/Logo"
import { Nav } from "../../molecules/Nav"
import { MobileMenu } from "../../molecules/MobileMenu"
import { SteamButton } from "../../molecules/SteamButton"
import { ProfileButton } from "../../molecules/ProfileButton"

interface HeaderProps {
  logged: boolean;
}

export const Header: React.FC<HeaderProps> = ({logged}) => {
  return (
    <header className="gap-4 p-4 mx-auto bg-black1">
      <nav className="flex items-center justify-between container">
        <Logo/>
        <Nav/>
        {logged ? <SteamButton /> : <ProfileButton/>}
        <MobileMenu logged={true}/>
      </nav>
    </header>
  )
}
