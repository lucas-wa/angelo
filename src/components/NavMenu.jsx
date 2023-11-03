import { PiPencilSimpleLight, PiRulerFill } from 'react-icons/pi';
import { MdOutlineImagesearchRoller } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { userSignOut } from '@/lib/firebase';
import { ArrowDownLeft } from 'lucide-react';



export default function NavMenu({ setService }) {

  const windowWidth = useRef(window.innerWidth)
  const menuRef = useRef();
  const [menuState, setMenuState] = useState(windowWidth.current > 768);


  const menuItems = [
    {
      key: 1,
      anchor: "#",
      item: "Gerador",
      service: "generator",
      icon: <PiPencilSimpleLight></PiPencilSimpleLight>
    },
    {
      key: 2,
      anchor: "#",
      item: "Upascale",
      service: "upscale",
      icon: <PiRulerFill></PiRulerFill>
    },
    {
      key: 3,
      anchor: "#",
      item: "Editor",
      service: "editor",
      icon: <MdOutlineImagesearchRoller></MdOutlineImagesearchRoller>
    }
  ]

  function handleMenuState() {
    setMenuState(prevState => !prevState)
  }


  useEffect(() => {


    function updateSize() {
      windowWidth.current = window.innerWidth;
      setMenuState(windowWidth.current > 768)
    }

    if (windowWidth.current > 768) {
      menuRef.current.classList.remove("animate-appear")
    }

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <nav className='relative z-10'>

      <div className='md:sr-only w-10 h-10 flex flex-col justify-center align-center gap-2 cursor-pointer' onClick={handleMenuState}>
        <span className='w-full h-px block bg-white rounded-md'></span>
        <span className='w-full h-px block bg-white rounded-md'></span>
        <span className='w-full h-px block bg-white rounded-md'></span>
      </div>

      {
        menuState &&
        <ul ref={menuRef} className="ring-white ring-1 p-5 backdrop-blur rounded-md absolute right-0 animate-appear md:flex md:relative md:gap-5 md:ring-0 md:ring-transparent md:flex-row">
          {
            menuItems.map(({ key, anchor, item, service, icon }) =>
              <li className="py-1 w-full" key={key} >
                <a href={anchor} onClick={e => {
                  e.preventDefault();
                  setService(service)
                }}
                  className="flex justify-start items-center gap-2 brightness-75 hover:brightness-100 transition-all">
                  {icon}
                  {item}
                </a>
              </li>
            )
          }

          <li className="py-1 w-full cursor-pointer">
            <a className="flex justify-start items-center gap-2 brightness-75 hover:brightness-100 transition-all"
            onClick={e => {
              e.preventDefault();
              userSignOut();
            }}>
              <ArrowDownLeft/>
              Sair
            </a>
          </li>
        </ul>
      }

    </nav>
  )
}
