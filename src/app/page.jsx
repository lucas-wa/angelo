'use client'

import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { Footer } from "../components/Footer"
import { useEffect, useState } from "react"
import { getUser, userSignIn } from "@/lib/firebase"
import { PiGoogleCardboardLogo, PiGoogleLogo, PiGoogleLogoBold, PiGoogleLogoFill, PiGoogleLogoLight } from "react-icons/pi"
import Image from "next/image"
import Wave from "react-wavify"

export default function Home() {

    const [user, setUser] = useState(null);
    const [service, setService] = useState("generator");

    useEffect(() => {
        getUser(setUser);
    }, []);

    return (
        <>

            {
                user ?
                    <div className="min-h-screen w-full bg-neutral-900 text-white flex flex-col justify-between items-center">
                        <div className="w-60 md:w-96 aspect-square rounded-full bg-transparent ring-2 ring-white/30 absolute  right-0 left-0 top-0 bottom-0 m-auto ">
                        </div>
                        <Header setService={setService}></Header>
                        <Main service={service}></Main>
                        <Footer></Footer>
                    </div>
                    :

                    <div className="relative min-h-screen w-full bg-neutral-900 text-white flex justify-between items-center overflow-hidden">
                        <form action="" className="w-full md:w-1/3 h-screen flex flex-col items-center justify-center p-10 gap-9">

                            <h1 className="text-3xl">Cadastro</h1>

                            <button className="flex justify-between items-center gap-3 p-3 rounded ring-1 ring-white"
                                onClick={e => {
                                    e.preventDefault();
                                    userSignIn(user, setUser);
                                }}>
                                <PiGoogleLogoBold size={25} className="" />
                                Cadastre-se com Google
                            </button>

                        </form>

                        <div className="h-screen flex-1 flex justify-end items-end">

                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 blur-lg w-60 aspect-square absolute -top-10 -right-10 rounded-full" ></div>

                            <Wave
                                className="absolute z-10 w-screen bottom md:relative md:z-0 md:w-full "
                                paused={false}
                                style={{
                                    display: 'flex',
                                    filter: "blur(10px)"
                                }}
                                options={{
                                    height: 20,
                                    amplitude: 20,
                                    speed: 0.50,
                                    points: 3
                                }}
                                fill={"url(#gradient)"}
                            >
                                <defs>
                                    <linearGradient id="gradient">
                                        <stop offset="10%" stopColor="rgb(236 72 153)" />
                                        <stop offset="90%" stopColor="rgb(168 85 247)" />
                                    </linearGradient>
                                </defs>
                            </Wave>

                        </div>
                    </div>

            }

        </>
    )

}