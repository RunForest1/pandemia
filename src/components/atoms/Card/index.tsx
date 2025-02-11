
import { Box, Button, Modal} from "@mui/material";
import { ReactNode, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface CardProps {
    name: string,
    description: string,
    price: number,
    png: ReactNode,
}


export const Card: React.FC<CardProps> = ({name, description, price, png}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className=" flex flex-col font-display bg-gray2 mr-2 p-10 gap-8 rounded-4xl">
        {png}
        <div className="flex flex-col gap-4">
            <span className="text-4xl text-white">{name}</span>
            <p className="text-xl text-gray1">{description}</p>
        </div>
        <Button onClick={handleOpen} size="large" variant="contained">{price} ₽</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box>
            <section className="border-white flex flex-col items-center text-center lg:items-stretch lg:text-start lg:flex-row lg:justify-between border p-8 gap-8 rounded-4xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#111214] lg:w-1/2 xl:w-4/10 ">
              <div className="flex flex-col  lg:justify-between flex-none w-1/2 gap-4  order-last lg:order-first">
                <span className="text-4xl xl:text-6xl text-white">{name}</span>
                <p className="text-xl xl:text-2xl text-gray1 break-words">{description}</p>
                <div className="flex items-center space-x-2 m-auto lg:m-0">
                  <button
                    onClick={decrementQuantity}
                    className="border-1 w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-gray1 hover:text-white duration-300 rounded-xl "
                  ><RemoveIcon/></button>
                  <span className="border-1 w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-gray1 rounded-xl text-xl">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className=" border-1 w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-gray1 hover:text-white duration-300 rounded-xl "
                  ><AddIcon/></button>
                </div>
                <Button sx={{ fontSize: 20 }} variant="contained">{price * quantity} ₽</Button>
              </div>
              <div>
                {png}
              </div>
            </section>
          </Box>
        </Modal>
    </div>
  )
}
