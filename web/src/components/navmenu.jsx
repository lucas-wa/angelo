import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavMenu() {


  const menuItems = [
    {
      anchor: "#",
      item: "Gerador"
    },
    {
      anchor: "#",
      item: "Upascale"
    },
    {
      anchor: "#",
      item: "Editor"
    }
  ]

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-inherit px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300">
          Menu
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-white" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-content origin-top-right rounded-md bg-inherit  shadow-lg ring-1 ring-white ring-opacity-100 focus:outline-none">
          <div className="py-1">
            {
              menuItems.map(({anchor, item}) =>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={anchor}
                      className={classNames(
                        active ? 'text-white': 'text-gray-300',
                        'block px-4 py-2 text-sm',
                        'transition-all',
                        'px-10'
                      )}
                    >
                      {item}
                    </a>
                  )}
                </Menu.Item>
              )
            }

          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
