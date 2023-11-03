import { EditorMain } from "./EditorMain";
import { GeneratorMain } from "./GeneratorMain";
import { UpscaleMain } from "./UpscaleMain";

export function Main({ service }) {




    return (
        <main className="w-full max-w-7xl flex items-center justify-center">

            {
                service == "generator" ?
                    <GeneratorMain></GeneratorMain>
                    :
                    service == "upscale" ?
                        <UpscaleMain></UpscaleMain>
                        :
                        <EditorMain></EditorMain>
            }

        </main>
    )
}