import { Steam } from "../../atoms/Steam"

export const SteamButton = () => {
  return (
    <a href="#" className="flex items-center gap-2 bg-gray3 py-2 px-6 rounded-xl">
      <Steam/>
      <p className="text-white font-display text-xl ">Вход через <b>Steam</b></p>
    </a>
  )
}
