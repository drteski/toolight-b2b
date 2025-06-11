import React from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { NavProps } from '@/lib/types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const NavMobile = ({ code, items }: NavProps) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="flex items-center justify-center p-2 ">
          <MenuIcon className="size-8 text-foreground" />
        </DrawerTrigger>
        <DrawerContent>
          <VisuallyHidden>
            <DrawerHeader>
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>
          </VisuallyHidden>
          <DrawerDescription className="flex flex-col gap-8 items-center justify-center text-foreground py-16">
            {items.map((item) => (
              <DrawerClose key={item.mainMenuLinkUrl} asChild>
                <Link
                  className="uppercase text-2xl hover:text-accent transition-colors"
                  href={`/${code}/${item.mainMenuLinkUrl}`}
                >
                  {item.mainMenuLinkTitle}
                </Link>
              </DrawerClose>
            ))}
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default NavMobile
