import { useRef, useState } from "react";
import { CustomInputFile } from "./CustomInputFile";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/axios";

export function UpscaleMain() {
  const [loading, setLoading] = useState(false);
  const imgRef = useRef();
  const [hasImage, setHasImage] = useState(false);
  const imgContainer = useRef();

  function handleImage(base64Img) {
    const virtualImg = new Image();

    virtualImg.onload = function () {
      const [width, height] = makeImgResponsive(virtualImg);

      imgRef.current.classList.remove("hidden");

      imgRef.current.src = virtualImg.src;

      imgRef.current.width = width;
      imgRef.current.height = height;

      setHasImage(true);
    };

    virtualImg.src = base64Img;
  }

  function makeImgResponsive(virtualImg) {
    let width, height;

    const virtualWidth = virtualImg.width;
    const virtualHeight = virtualImg.height;

    const aspectRatio = virtualWidth / virtualHeight;

    const widthIsBigger = virtualWidth > virtualHeight;

    console.log(
      imgContainer.current.offsetWidth,
      typeof imgContainer.current.style.width
    );

    if (widthIsBigger) {
      width = imgContainer.current.offsetWidth - 20;
      height = width / aspectRatio;
    } else {
      height = imgContainer.current.offsetHeight - 20;
      width = height * aspectRatio;
    }

    return [width, height];
  }

  async function handlePromptSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const img = imgRef.current.src.split(",")[1];

    const response = await api.post("/upscale", {
      file: img,
      service: "upscale",
    });

    if (response.status === 200) {
      handleImage(response.data.image_raw);
    }

    setLoading(false);
  }

  return (
    <div
      key={2}
      className="w-full h-auto flex flex-grow gap-10 py-10 px-16 items-center justify-center flex-col-reverse md:flex-row animate-slide-left"
    >
      <form
        onSubmit={(e) => handlePromptSubmit(e)}
        action=""
        className="w-full flex-1 items-center justify-center flex flex-col gap-5"
      >
        <CustomInputFile
          handleImage={handleImage}
          imgRef={imgRef}
        ></CustomInputFile>

        <button
          disabled={loading || !hasImage}
          className="w-full h-full p-3 text-center rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 brightness-90 hover:brightness-100 transition-all"
        >
          {loading ? (
            <Loader2 className="w-full aspect-square animate-spin m-auto" />
          ) : (
            "Enviar"
          )}
        </button>
      </form>

      <div
        ref={imgContainer}
        className="w-full h-auto flex justify-center items-center bg-white/30 backdrop-blur rounded flex-1 aspect-square ring-1 ring-white"
      >
        <img
          src=""
          alt="Imagem do upload"
          className="hidden rounded"
          ref={imgRef}
        />
      </div>
    </div>
  );
}
