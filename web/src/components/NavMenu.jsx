import { PiPencilSimpleLight, PiRulerFill } from 'react-icons/pi';
import { MdOutlineImagesearchRoller } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';



export default function NavMenu() {

  const windowWidth = useRef(window.innerWidth)
  const menuRef = useRef();
  const [menuState, setMenuState] = useState(windowWidth.current > 768);


  const menuItems = [
    {
      key: 1,
      anchor: "#",
      item: "Gerador",
      icon: <PiPencilSimpleLight></PiPencilSimpleLight>
    },
    {
      key: 2,
      anchor: "#",
      item: "Upascale",
      icon: <PiRulerFill></PiRulerFill>
    },
    {
      key: 3,
      anchor: "#",
      item: "Editor",
      icon: <MdOutlineImagesearchRoller></MdOutlineImagesearchRoller>
    }
  ]

  function handleMenuState(){
    setMenuState(prevState => !prevState)
  }

  useEffect(() => {


    function updateSize(){
      windowWidth.current = window.innerWidth;
      setMenuState(windowWidth.current > 768)
    }

    if(windowWidth.current > 768) {
      menuRef.current.classList.remove("animate-appear")
    }

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  },[])

  return (
    <nav className='relative'>

      <div className='md:sr-only w-10 h-10 flex flex-col justify-center align-center gap-2 cursor-pointer' onClick={handleMenuState}>
        <span className='w-full h-px block bg-white rounded-md'></span>
        <span className='w-full h-px block bg-white rounded-md'></span>
        <span className='w-full h-px block bg-white rounded-md'></span>
      </div>

      {
        menuState &&
        <ul ref={menuRef} className="ring-white ring-1 p-5 rounded-md absolute right-0 animate-appear md:flex md:relative md:gap-5 md:ring-0 md:ring-transparent md:flex-row">
          {
            menuItems.map(({ key, anchor, item, icon }) =>
              <li className="py-1 w-full"  key={key} >
                <a href={anchor} onClick={e => e.preventDefault()}
                  className="flex justify-start items-center gap-2 brightness-75 hover:brightness-100 transition-all">
                  {icon}
                  {item}
                </a>
              </li>
            )
          }
        </ul>
      }

    </nav>
  )
}
