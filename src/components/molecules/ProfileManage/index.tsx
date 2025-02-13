import { SERVERS } from "../ServerList"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Button } from "@mui/material";


export const ProfileManage = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 font-display gap-5 md:p-8">
        <div className="bg-black2 p-10 flex flex-col gap-10  rounded-4xl">
            <div className="flex flex-col text-center sm:text-start sm:flex-row items-center">
                <AccountCircleIcon sx={{ color: 'gray', fontSize: 100 }}/>
                <div className="flex flex-col gap-2">
                    <span className="text-white text-2xl lg:text-3xl font-bold">NickName_01</span>
                    <p className="text-gray1 text-xm">Статус будет расположен тут</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center sm:items-start">
                <span className="text-gray1 text-xm sm:text-base lg:text-xl font-bold"><MonetizationOnRoundedIcon color='primary'sx={{ fontSize: 40 }}/>Ваш баланс</span>
                <p className="text-white text-xl md:text-2xl lg:text-5xl font-bold">12 000.60 ₽</p>
            </div>
            <Button sx={{ fontSize: 18 }} variant="contained">Пополнить</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 h-1/2  gap-4 grow-0 lg:pr-8">
            {SERVERS.map(({key, name, hours})=>
            <div key={key} className="bg-black2 font-display p-4 rounded-3xl flex flex-col gap-4">
                <span className="text-white text-sm sm:text-base lg:text-2xl font-bold">{name}</span>
                <p className="text-gray1 text-xs lg:text-base font-bold flex items-center gap-1">Вы играли: <AccessTimeRoundedIcon sx={{ color: '#9095a3', fontSize: 20 }}/> {hours} часов</p>
            </div>)}
        </div>
    </section>
  )
}
