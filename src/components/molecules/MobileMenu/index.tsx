import { useState } from "react";
import { OpenMenu } from "../../atoms/Icons/OpenMenu";

import { LINKS } from "../Nav";
import { Link } from "../../atoms/Link";
import { Steam } from "../../atoms/Icons/Steam";


export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <div className="relative lg:hidden">
      <button
        className="focus:outline-none z-30"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <OpenMenu />
      </button>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>


      <div
        className={`fixed top-0 right-0 w-3/4 max-w-md h-full bg-gray3  z-30 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start p-8 space-y-4">
          <div className="flex flex-col space-y-4 ">
            {LINKS.map(({ text, icon }) => (
              <Link key={text} icon={icon} text={text} />
            ))}
          </div>
        <a href="#" className="flex items-center gap-2 bg-gray1/25 duration-300 py-2 px-6 rounded-xl">
            <Steam/>
            <p className="text-white font-display text-xl ">Вход через <b>Steam</b></p>
        </a>
        </nav>
      </div>
    </div>
  );
};
