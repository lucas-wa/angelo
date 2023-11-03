import { AiFillGithub } from 'react-icons/ai';


export function Footer() {




    return (
        <footer className="min-h-10 w-full p-10 bg-black/30 backdrop-blur border-t-2 border-t-white/30">
            <h2 className='text-2xl'>Equipe</h2>

            <a className="mt-5 w-full flex gap-2 text-xl justify-start items-center cursor-pointer"target='_blank' href='https://github.com/carlosedurochas'>
                <AiFillGithub></AiFillGithub>
                <p>carlosedurochas</p>
            </a>
            <a className="w-full flex gap-2 text-xl justify-start items-center cursor-pointer"target='_blank' href='https://github.com/lucas-wa'>
                <AiFillGithub></AiFillGithub>
                <p>lucas-wa</p>
            </a>
        </footer>
    )
}