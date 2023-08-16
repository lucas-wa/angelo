import logo from "../assets/logo.png"

export function Header(){
    return (
        <header className="p-10 flex justify-between items-center">
            <figure>
                <img src={logo} alt="Logo Angelo" className="w-32 md:w-56"/>
            </figure>

            <nav className="flex justify-center items-center flex-col">
                <ul className="flex align-center justify-center gap-5">
                    <li className="md:cursor-pointer md:brightness-75 md:hover:brightness-100 md:transition-all">Gerador</li>
                    <li className="md:cursor-pointer md:brightness-75 md:hover:brightness-100 md:transition-all">Upscale</li>
                    <li className="md:cursor-pointer md:brightness-75 md:hover:brightness-100 md:transition-all">Editor</li>
                </ul>
            </nav>
        </header>
    )
}