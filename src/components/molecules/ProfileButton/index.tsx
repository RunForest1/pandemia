import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ProfileButton = () => {
  return (
    <a href="#" className="hidden lg:flex items-center gap-2 hover:bg-gray3 duration-300 py-3 px-6 rounded-xl">
      <AccountCircleIcon sx={{ color: 'gray', fontSize: 40 }}/>
      <p className="text-white font-display text-xl font-bold">NickName_01</p>
    </a>
  )
}
