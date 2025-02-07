import { Steam } from "../../atoms/Steam"

export const SteamButton = () => {
  return (
    <a href="#" className="hidden lg:flex items-center gap-2 hover:bg-gray3 duration-300 py-2 px-6 rounded-xl">
      <Steam/>
      <p className="text-white font-display text-xl ">Вход через <b>Steam</b></p>
    </a>
  )
}
