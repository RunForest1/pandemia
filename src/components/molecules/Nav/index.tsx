
import { Link } from '../../atoms/Link';

import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

export const LINKS = [
    { text: 'Twitter', icon: <TwitterIcon sx={{ color: '#1D9BF0', fontSize: 45 }} />, },
    { text: 'YouTube', icon: <YouTubeIcon  sx={{ color: '#FF0000', fontSize: 45, }} /> },
    { text: 'Telegramm', icon: <TelegramIcon  sx={{ color: '#229ED9', fontSize: 45 }} /> },
    { text: 'FaceBook', icon: <FacebookIcon  sx={{ color: '#0866FF', fontSize: 45 }}/> },
  ];

export const Nav = () => {
  return (
    <nav className='hidden lg:flex gap-2 '>
        {LINKS.map(({text, icon}) => <Link key={text} icon = {icon} text = {text}/>)}
    </nav>
    
  )
}
