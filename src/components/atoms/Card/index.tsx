
import { Button } from "@mui/material";
import { ReactNode } from "react";

interface CardProps {
    name: string,
    description: string,
    price: string,
    png: ReactNode,
}


export const Card: React.FC<CardProps> = ({name, description, price, png}) => {
  return (
    <div className=" flex flex-col font-display bg-gray2 mr-2 p-10 gap-8 rounded-4xl">
        {png}
        <div className="flex flex-col gap-4">
            <span className="text-4xl text-white">{name}</span>
            <span className="text-xl text-gray1">{description}</span>
        </div>
        <Button size="large" variant="contained">{price} ₽</Button>
    </div>
  )
}
