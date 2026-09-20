import { ServerList } from '../../molecules/ServerList';
import { Shop } from '../../molecules/Shop';
import { NewsSlider } from '../NewsSlider';

export const Main = () => {
    return (
        <>
            <ServerList />
            <NewsSlider />
            <Shop />
        </>
    );
};
