import logo from "../assets/logo.png"
import NavMenu from "./NavMenu";

export function Header() {

    return (
        <header className="px-10 py-6 flex justify-between items-center border-b-2 border-b-white/30">
            <figure>
                <img src={logo} alt="Logo Angelo" className="w-36 md:w-48" />
            </figure>

            <NavMenu></NavMenu>
        </header>
    )
}