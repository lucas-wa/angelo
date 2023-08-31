import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { Footer } from "../components/Footer"

export function Home() {
    return (
        <>

            <div className="min-h-screen  bg-neutral-900	text-white flex flex-col">
                <div className="w-96 aspect-square rounded-full bg-transparent ring-2 ring-white/30 absolute  right-0 left-0 top-0 bottom-0 m-auto ">
                </div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        </>
    )

}