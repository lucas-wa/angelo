
export function GeneratorMain() {
    return (
        <div key={1} className="w-full h-auto flex flex-grow gap-10 py-10 px-16 items-center justify-center flex-col-reverse md:flex-row animate-slide-left">
            <form action="" className="w-full flex-1 items-center justify-center flex flex-col gap-5">
                <input type="text" placeholder="Digite o prompt da imagem" className="w-full p-3 bg-white/30 backdrop-blur rounded outline-none placeholder-white/50 text-white focus:pl-4 transition-all ring-1 ring-white" />

                <button className="w-full h-full p-3 text-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 brightness-90 hover:brightness-100 transition-all">
                    Enviar
                </button>
            </form>

            <div className="w-full max-w-2xl h-auto bg-white/30 backdrop-blur rounded flex-1 aspect-square ring-1 ring-white">
            </div>
        </div>
    )
}