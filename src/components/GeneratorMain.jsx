import { useEffect, useRef, useState } from "react"
import { generateImage, getImage } from "../lib/leap";
import { Loader2 } from "lucide-react";
import { Download } from "lucide-react";

export function GeneratorMain() {

    const [imageUri, setImageUri] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    async function handlePromptSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const prompt = inputRef.current.value;

        const inferenceId = await generateImage(prompt);

        const getImageInterval = setInterval(async () => {

            const uri = await getImage(inferenceId);

            if (uri) {
                clearInterval(getImageInterval);
                setImageUri(uri);
                setLoading(false);
            }

        }, 1000)

    }

    return (
        <div key={1} className="w-full h-auto flex flex-grow gap-10 py-10 px-16 items-center justify-center flex-col-reverse md:flex-row animate-slide-left">
            <form onSubmit={e => handlePromptSubmit(e)} action="" className="w-full flex-1 items-center justify-center flex flex-col gap-5">
                <input type="text" placeholder="Digite o prompt da imagem" className="w-full p-3 bg-white/30 backdrop-blur rounded outline-none placeholder-white/50 text-white focus:pl-4 transition-all ring-1 ring-white" ref={inputRef} />

                {
                    imageUri &&
                    <div className="w-full h-full flex justify-center items-center p-3 text-center rounded bg-indigo-500 brightness-90 hover:brightness-100 transition-all">
                        <Download className="mr-2"></Download>
                        <span>Baixar imagem</span>
                    </div>
                }

                <button disabled={loading} className="w-full h-full p-3 text-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 brightness-90 hover:brightness-100 transition-all">
                    {
                        loading ?
                            <Loader2 className="w-full aspect-square animate-spin m-auto" />
                            :
                            "Enviar"
                    }
                </button>
            </form>

            <div className="w-full max-w-2xl h-auto bg-white/30 backdrop-blur rounded flex-1 aspect-square ring-1 ring-white">

                {
                    imageUri &&
                    <img src={imageUri} alt="Imagem gerada pela rede" />
                }

            </div>
        </div>
    )
}