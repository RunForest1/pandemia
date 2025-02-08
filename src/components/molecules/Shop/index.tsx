import { ShopBar } from "../../atoms/ShopBar"
import { Card } from "../../atoms/Card";
import { Niva } from "../../atoms/Icons/Niva";
import { Gunter } from "../../atoms/Icons/Gunter";

export const CARDS = [
    {key: 1, name: 'Нива', description:'Описание товара', price: '159', png:<Niva/>},
    {key: 2, name: 'Волга', description:'Описание товара', price: '169', png:<Gunter/>},
    {key: 3, name: 'Сарка', description:'Описание товара', price: '139', png:<Niva/>},
    {key: 4, name: 'Гюнтер', description:'Описание товара', price: '129', png:<Niva/>},
  ];


export const Shop = () => {
  return (
    <section className="container">
        <ShopBar/>
        <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {CARDS.map(({key, name, description, price, png}) => <Card key={key} name={name} description={description} price={price} png={png}/>)}
          {CARDS.map(({key, name, description, price, png}) => <Card key={key} name={name} description={description} price={price} png={png}/>)}
          {CARDS.map(({key, name, description, price, png}) => <Card key={key} name={name} description={description} price={price} png={png}/>)}
        
        </div>
    </section>
  )
}
