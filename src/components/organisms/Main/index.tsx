import { ServerList } from '../../molecules/ServerList';
import { Shop } from '../../molecules/Shop';

export const Main = () => {
    return (
        <>
            <div className="flex flex-col items-center pt-30 gap-3 text-center">
                <span className="text-2xl md:text-4xl lg:text-7xl text-white font-display">
                    Добро пожаловать на серверы DayZ.{' '}
                </span>
                <p className="text-xl md:text-2xl lg:text-4xl font-display text-gray1">
                    Выберите сервер и присоединяйтесь к играм прямо сейчас!
                </p>
            </div>
            <ServerList />
            <Shop />
        </>
    );
};
