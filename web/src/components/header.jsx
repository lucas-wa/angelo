import { useEffect, useRef, useState } from "react"
import logo from "../assets/logo.png"
import NavMenu from "./navmenu";

export function Header() {


    const menu = useRef();
    const windowWidth = useRef(window.innerWidth);
    const [menuState, setMenuState] = useState(windowWidth > 768);

    useEffect(() => {
        const screenSize = windowWidth.current


    }, [menuState, windowWidth])




    return (
        <header className="p-10 flex justify-between items-center">
            <figure>
                <img src={logo} alt="Logo Angelo" className="w-36 md:w-48" />
            </figure>

            <NavMenu></NavMenu>
        </header>
    )
}