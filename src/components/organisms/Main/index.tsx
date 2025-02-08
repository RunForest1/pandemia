import { ServerList } from "../../molecules/ServerList";
import { Shop } from "../../molecules/Shop";

export const Main = () => {
    return (
      <>
        <section className=" bg-contain bg-top bg-no-repeat bg-[url(https://s3-alpha-sig.figma.com/img/c556/9d7e/308b77a448114e7cc7cee5118ed0c123?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XHWdbiRf6p5Uc6F5g9uYTlzKbDHbHG7tYeuT0UZfo32JYPMqjizI5z7GC0nJgj89OmtCrhzyWF91r-QGAawLZMAC~S7YYImk5LD9~uS3PaC5sneyN-34h3gB-mGBHZXM5FP4OViuxWQgeNJn4e05fWap593ggSD9sbmtsn8Go9nZpxcgzdnt-yXoZINu8bTYjcoWgflxZa5cbr9z6dNGtAnKK0CzOdbgsaFyNy-uiTX-RT4QIsIyNX4yQ92WFCm--lliQcelWOAAQyN4UoFIEx6rE~7q0YYbZWnX1XZ-jTN~XXwM9TBTZo8hCo4gjTUZdIDlmwxvnKnla-jIuJn8fQ__)]">
          <div className="flex flex-col items-center pt-30 gap-3">
            <span className="text-2xl md:text-4xl lg:text-7xl text-white font-display">Добро пожаловать на серверы DayZ. </span>
            <p className="text-xl md:text-2xl lg:text-4xl font-display text-gray1">Выберите сервер и присоединяйтесь к играм прямо сейчас!</p>
          </div>
          <ServerList/>
          <Shop/>
        </section>
      </>
    );
  };
