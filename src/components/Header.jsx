import NavMenu from "./NavMenu";
import Image from "next/image";

export function Header({ setService }) {

    return (
        <header className="px-10 w-full py-6 flex justify-between items-center border-b-2 border-b-white/30">
            <figure >
                <Image src={"/logo.png"} alt="Logo Angelo" width={1000} height={1000} className="w-36 md:w-48" />
            </figure>

            <NavMenu setService={setService}></NavMenu>
        </header>
    )
}