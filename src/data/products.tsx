import BatteryChargingFullRoundedIcon from '@mui/icons-material/BatteryChargingFullRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { Niva } from '../components/atoms/Icons/Niva';
import { Gunter } from '../components/atoms/Icons/Gunter';
import { Sarka } from '../components/atoms/Icons/Sarka';
import { Volga } from '../components/atoms/Icons/Volga';
import { PartTile } from '../components/atoms/Icons/PartTile';

export type ProductType = 'cars' | 'parts' | 'build';
export type ProductServer = 'chernarus' | 'livonia';

export interface Product {
    key: number;
    name: string;
    price: number;
    png: React.ReactNode;
    type: ProductType;
    server: ProductServer;
}

const iconSx = { fontSize: 56 };

export const PRODUCTS: Product[] = [
    // Chernarus PLUS 3PP
    {
        key: 1,
        name: 'Нива',
        price: 159,
        png: <Niva />,
        type: 'cars',
        server: 'chernarus',
    },
    {
        key: 2,
        name: 'Волга',
        price: 169,
        png: <Volga />,
        type: 'cars',
        server: 'chernarus',
    },
    {
        key: 5,
        name: 'Аккумулятор',
        price: 49,
        png: <PartTile icon={<BatteryChargingFullRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'chernarus',
    },
    {
        key: 6,
        name: 'Комплект инструментов',
        price: 39,
        png: <PartTile icon={<HandymanRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'chernarus',
    },
    {
        key: 7,
        name: 'Радиатор',
        price: 59,
        png: <PartTile icon={<DeviceThermostatRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'chernarus',
    },
    {
        key: 8,
        name: 'Каркас сторожевой вышки',
        price: 99,
        png: <PartTile icon={<ConstructionRoundedIcon sx={iconSx} />} />,
        type: 'build',
        server: 'chernarus',
    },

    // Livonia PLUS 3PP
    {
        key: 3,
        name: 'Сарка',
        price: 139,
        png: <Sarka />,
        type: 'cars',
        server: 'livonia',
    },
    {
        key: 4,
        name: 'Гюнтер',
        price: 129,
        png: <Gunter />,
        type: 'cars',
        server: 'livonia',
    },
    {
        key: 9,
        name: 'Свеча зажигания',
        price: 29,
        png: <PartTile icon={<BoltRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'livonia',
    },
    {
        key: 10,
        name: 'Топливный бак',
        price: 55,
        png: <PartTile icon={<LocalGasStationRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'livonia',
    },
    {
        key: 11,
        name: 'Ремень ГРМ',
        price: 35,
        png: <PartTile icon={<LoopRoundedIcon sx={iconSx} />} />,
        type: 'parts',
        server: 'livonia',
    },
    {
        key: 12,
        name: 'Металлический лист',
        price: 45,
        png: <PartTile icon={<ViewInArRoundedIcon sx={iconSx} />} />,
        type: 'build',
        server: 'livonia',
    },
];

export const getProductByKey = (key: number) =>
    PRODUCTS.find((product) => product.key === key);
