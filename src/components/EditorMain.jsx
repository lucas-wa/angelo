import { useRef, useState } from "react";
import { CustomInputFile } from "./CustomInputFile";
import CanvasDraw from "react-canvas-draw";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

export function EditorMain() {
    const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const canvasRef = useRef();
  const canvasContainer = useRef();

  const [hasImage, setHasImage] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasSrc, setCanvasSrc] = useState("");

  function handleImage(base64Img) {
    const virtualImg = new Image();

    virtualImg.onload = function () {
      const [width, height] = makeImgResponsive(virtualImg);

      // canvasRef.current.classList.remove("hidden")

      // canvasRef.current.style.backgroundImage = `url(${virtualImg.src})`;

      // canvasRef.current.style.backgroundSize = 'cover';

      // canvasRef.current.style.width = width + "px";
      // canvasRef.current.style.height = height + "px";

      setCanvasHeight(height);
      setCanvasWidth(width);
      setHasImage(true);

      setCanvasSrc(`${virtualImg.src}`);
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
      canvasContainer.current.offsetWidth,
      typeof canvasContainer.current.style.width
    );

    if (widthIsBigger) {
      width = canvasContainer.current.offsetWidth - 20;
      height = width / aspectRatio;
    } else {
      height = canvasContainer.current.offsetHeight - 20;
      width = height * aspectRatio;
    }

    return [width, height];
  }

  async function handlePromptSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const prompt = inputRef.current.value;
    const canvas = canvasRef.current;

    const mask = canvas.canvas.drawing.toDataURL().split(",")[1];
    const img = canvasSrc.split(",")[1];

    const response = await api.post("/editor", {
      prompt,
      mask,
      file: img,
      service: "editor",
    });

    if (response.status === 200) {
      // Clear canvas
      canvas.clear();
      handleImage(response.data.image_raw);
    }

    setLoading(false);
  }

  return (
    <div
      key={3}
      className="w-full h-auto flex flex-grow gap-10 py-10 px-16 items-center justify-center flex-col-reverse md:flex-row animate-slide-left"
    >
      <form
        onSubmit={async (e) => await handlePromptSubmit(e)}
        action=""
        className="w-full flex-1 items-center justify-center flex flex-col gap-5"
      >
        <CustomInputFile handleImage={handleImage}></CustomInputFile>

        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o prompt da edição"
          className="w-full p-3 bg-white/30 backdrop-blur rounded outline-none placeholder-white/50 text-white focus:pl-4 transition-all ring-1 ring-white"
        />

        <button
          disabled={loading}
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
        ref={canvasContainer}
        className="flex justify-center items-center w-full h-auto bg-white/30 backdrop-blur rounded flex-1 aspect-square ring-1 ring-white"
      >
        {/* <canvas ref={canvasRef} className="hidden"></canvas> */}

        {hasImage && (
          <CanvasDraw
            ref={canvasRef}
            hideGrid={true}
            catenaryColor={"#000"}
            imgSrc={canvasSrc}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            brushColor={"#000"}
          ></CanvasDraw>
        )}
      </div>
    </div>
  );
}
