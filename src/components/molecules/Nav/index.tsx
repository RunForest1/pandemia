import { FaceBook } from '../../atoms/Icons/FaceBook';
import { Instagramm } from '../../atoms/Icons/Instagramm';
import { Link } from '../../atoms/Link';
import { Twitter } from '../../atoms/Icons/Twitter';
import { YouTube } from '../../atoms/Icons/YouTube/Index';

export const LINKS = [
    { text: 'Twitter', icon: <Twitter /> },
    { text: 'Instagramm', icon: <Instagramm /> },
    { text: 'YouTube', icon: <YouTube /> },
    { text: 'FaceBook', icon: <FaceBook /> },
  ];

export const Nav = () => {
  return (
    <nav className='hidden lg:flex gap-2'>
        {LINKS.map(({text, icon}) => <Link key={text} icon = {icon} text = {text}/>)}
    </nav>
    
  )
}
