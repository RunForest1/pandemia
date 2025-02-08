
import { Online } from "../Online";

export interface ServerProps {
  name: string;
  online: number;
  status: boolean;
}

export const Server: React.FC<ServerProps> = ({name, online, status}) => {
  return (
    <div className="bg-black1/80 flex flex-col font-display p-6 rounded-4xl">
      <span className="text-white text-xl md:text-2xl lg:text-4xl w-25 md:w-30 lg:w-40">{name}</span>
      <span className="text-gray1 flex  text-sm lg:text-xl gap-3">Состояние: <span className={online < 150 ? (status ? "text-green-600" : "text-gray1") : "text-red1"}>{online < 150 ? (status ? "• Активный" : "• Выключен") : "• Переполнен"}</span></span>
      <span className="text-gray1 flex items-center gap-2 text-sm lg:text-xl"><Online/>Онлайн: <span className={`${online < 150 ? 'text-gray1': 'text-red1'}`}>{online} / 150</span></span>
    </div>
  )
}
