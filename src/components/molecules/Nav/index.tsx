import { FaceBook } from '../../atoms/FaceBook';
import { Instagramm } from '../../atoms/Instagramm';
import { Link } from '../../atoms/Link';
import { Twitter } from '../../atoms/Twitter';
import { YouTube } from '../../atoms/YouTube/Index';

export const Links = [
    { text: 'Twitter', icon: <Twitter /> },
    { text: 'Instagramm', icon: <Instagramm /> },
    { text: 'YouTube', icon: <YouTube /> },
    { text: 'FaceBook', icon: <FaceBook /> },
  ];

export const Nav = () => {
  return (
    <div className='flex gap-2'>
        {Links.map(({text, icon}) => <Link icon = {icon} text = {text}/>)}
    </div>
  )
}
