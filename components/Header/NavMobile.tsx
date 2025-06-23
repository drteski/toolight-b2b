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
import { MainMenuItem } from '@/lib/types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type NavProps = {
  locale: string
  items: MainMenuItem[]
}

export const NavMobile = ({ locale, items }: NavProps) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger
          className="flex items-center justify-center p-2"
          name="Menu"
          aria-label="Menu"
        >
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
                  href={`/${locale}/${item.mainMenuLinkUrl}`}
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
