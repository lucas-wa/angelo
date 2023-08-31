import { useRef } from 'react';
import { CustomInputFile } from './CustomInputFile';


export function UpscaleMain() {

    const imgRef = useRef();
    const imgContainer = useRef();

    function handleImage(base64Img) {

        const virtualImg = new Image();

        virtualImg.onload = function () {
            const [width, height] = makeImgResponsive(virtualImg);

            imgRef.current.classList.remove("hidden")

            imgRef.current.src = virtualImg.src;

            imgRef.current.width = width;
            imgRef.current.height = height;
            
        }

        virtualImg.src = base64Img

    }

    function makeImgResponsive(virtualImg) {

        let width, height;

        const virtualWidth = virtualImg.width;
        const virtualHeight = virtualImg.height;

        const aspectRatio = virtualWidth / virtualHeight;

        const widthIsBigger = virtualWidth > virtualHeight;

        console.log(imgContainer.current.offsetWidth, typeof imgContainer.current.style.width)

        if (widthIsBigger) {
            width = imgContainer.current.offsetWidth - 20
            height = width / aspectRatio
        }
        else {
            height = imgContainer.current.offsetHeight - 20;
            width = height * aspectRatio;
        }

        return [width, height]
    }

    return (
        <div key={2} className="w-full h-auto flex flex-grow gap-10 py-10 px-16 items-center justify-center flex-col-reverse md:flex-row animate-slide-left">
            <form action="" className="w-full flex-1 items-center justify-center flex flex-col gap-5">

                <CustomInputFile handleImage={handleImage} imgRef={imgRef}>
                </CustomInputFile>

                <button className="w-full h-full p-3 text-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 brightness-90 hover:brightness-100 transition-all">
                    Enviar
                </button>
            </form>

            <div ref={imgContainer} className="w-full h-auto flex justify-center items-center bg-white/30 backdrop-blur rounded flex-1 aspect-square ring-1 ring-white">
                <img
                    src=""
                    alt="Imagem do upload"
                    className="hidden rounded"
                    ref={imgRef}
                />
            </div>
        </div>
    )
}