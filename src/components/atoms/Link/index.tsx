import { ReactNode } from "react"

interface LinkProps {
    icon: ReactNode,
    text: string
}

export const Link: React.FC<LinkProps> = ({icon, text}) => {
  return (
    <a href="#" className="text-gray1 font-display text-xm flex gap-4 py-2 px-6 hover:bg-gray3 duration-300 items-center justify-center rounded-xl">
        {icon}{text}
    </a>
  )
}
