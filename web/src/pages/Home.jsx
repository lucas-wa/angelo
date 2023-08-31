import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { Footer } from "../components/Footer"
import { useState } from "react"

export function Home() {

    const [service, setService] = useState("generator");

    return (
        <>
            <div className="min-h-screen w-full bg-neutral-900 text-white flex flex-col justify-between items-center">
                <div className="w-96 aspect-square rounded-full bg-transparent ring-2 ring-white/30 absolute  right-0 left-0 top-0 bottom-0 m-auto ">
                </div>
                <Header setService={setService}></Header>
                <Main service={service}></Main>
                <Footer></Footer>
            </div>
        </>
    )

}