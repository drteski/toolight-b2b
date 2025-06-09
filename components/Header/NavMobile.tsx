import React from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface MenuItem {
  mainMenuLinkTitle: string
  mainMenuLinkUrl: string
}

const NavMobile = ({ code, items }: { code: string; items: MenuItem[] }) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="flex items-center justify-center p-2">
          <MenuIcon className="size-8 text-foreground" />
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="flex flex-col gap-8 items-center justify-center text-foreground">
            {items.map((item) => (
              <Link
                key={item.mainMenuLinkUrl}
                className="uppercase text-2xl hover:text-accent transition-colors"
                href={`/${code}/${item.mainMenuLinkUrl}`}
              >
                {item.mainMenuLinkTitle}
              </Link>
            ))}
          </DrawerDescription>
          <DrawerFooter className="h-[100px]">
            {/*<Button>Submit</Button>*/}
            <DrawerClose>{/*<Button variant="outline">Cancel</Button>*/}</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default NavMobile
