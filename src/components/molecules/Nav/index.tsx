import { Link } from '../../atoms/Link';

import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

export const LINKS = [
    {
        text: 'Twitter',
        icon: <TwitterIcon sx={{ color: '#1d9bf0', fontSize: 20 }} />,
    },
    {
        text: 'YouTube',
        icon: <YouTubeIcon sx={{ color: '#ff0000', fontSize: 20 }} />,
    },
    {
        text: 'Telegramm',
        icon: <TelegramIcon sx={{ color: '#229ed9', fontSize: 20 }} />,
    },
    {
        text: 'FaceBook',
        icon: <FacebookIcon sx={{ color: '#0866ff', fontSize: 20 }} />,
    },
];

export const Nav = () => {
    return (
        <nav className="hidden lg:flex gap-2 ">
            {LINKS.map(({ text, icon }) => (
                <Link key={text} icon={icon} text={text} />
            ))}
        </nav>
    );
};
