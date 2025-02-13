import { Logo } from "../../atoms/Icons/Logo"

export const Footer = () => {
  return (
    <section className="w-full h-auto bg-gray2 py-20 px-40 font-display mt-10">
        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-3 lg:gap-0 ">
            <Logo/>
            <div className="grid gap-16">
                <span className="text-white text-4xl">Pages</span>
                <div className="text-gray1 flex flex-col text-xl gap-8">
                    <a href="#">Home</a><a href="#">Market</a><a href="#">Profile</a><a href="#">Servers</a>
                </div>
            </div>
            <div className="grid gap-16">
                <span className="text-white text-4xl">Socials</span>
                <div className="text-gray1 flex flex-col text-xl gap-8">
                    <a href="#">FaceBook</a><a href="#">Instagramm</a><a href="#">Youtube</a><a href="#">Twitter</a>
                </div>
            </div>
        </div>
        <span className="flex justify-center mt-16 text-gray1 text-xl">© Pandemia 2025  | All rights reserved</span>
    </section>
  )
}
