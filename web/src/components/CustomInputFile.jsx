import { AiOutlineCloudUpload } from 'react-icons/ai';

import { useRef, useState } from "react"

export function CustomInputFile() {

    const [fileName, setFileName] = useState("Faça o upload da imagem");
    const inputRef = useRef();

    function handleFileName() {
        const filepath = inputRef.current.value
        const arrFilePath = filepath.split(/(\\|\/)/g);
        let filename = arrFilePath[arrFilePath.length - 1];

        if (filename.length > 30) {
            const arrFile = filename.split(".")
            let name = arrFile[0]
            let mime = arrFile[1]

            name = name.slice(0, 30) + '[...]';

            filename = name + '.' + mime
        }

        setFileName(filename)
    }

    return (
        <>
            <label 
            htmlFor="dropzone-file" 
            className="w-full p-3 bg-white/30 backdrop-blur rounded outline-none placeholder-white/50 text-white focus:pl-4 transition-all ring-1 ring-white cursor-pointer text-7xl flex items-center justify-center flex-col">
                <AiOutlineCloudUpload></AiOutlineCloudUpload>
                <p className='text-xl'>{fileName}</p>
            </label>

            <input 
            ref={inputRef} 
            type="file" 
            id="dropzone-file" 
            placeholder="Faça o upload da imagem" 
            className="hidden" 
            onChange={e => handleFileName()} 
            accept="image/png, image/jpeg"/>
        </>
    )
}