import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { Footer } from "../components/Footer"

export function Home() {
    return (
        <>

            <div className="min-h-screen  bg-neutral-900	text-white flex flex-col z-10">
                <div className="w-96 aspect-square rounded-full bg-transparent ring-2 ring-white absolute -bottom-20 right-10 ">
                </div>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </div>
        </>
    )

}