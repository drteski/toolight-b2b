import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Flags from '@/components/Icons/Flags'
import { locales } from '@/middleware'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

import Logo from '@/components/Header/Logo'
import * as SheetPrimitive from '@radix-ui/react-dialog'

const NavMobile = ({ code }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="p-3">
          <MenuIcon className="size-8 text-foreground" />
        </SheetTrigger>
        <SheetContent className="w-screen">
          <SheetHeader>
            <SheetTitle>
              <Logo className="h-10" />
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-8 items-end justify-center h-screen pb-20 text-foreground">
              <Link
                className="uppercase font-medium text-3xl hover:text-accent transition-colors"
                href={`/${code}/katalog`}
              >
                Produkty
              </Link>
              <Link
                className="uppercase font-medium text-3xl hover:text-accent transition-colors"
                href="#about-us"
              >
                O nas
              </Link>
              <Link
                className="uppercase font-medium text-3xl hover:text-accent transition-colors"
                href={`/${code}/punkty-sprzedazy`}
              >
                Punkty sprzedazy
              </Link>
              <Link
                className="uppercase font-medium text-3xl hover:text-accent transition-colors"
                href={`/${code}/wsparcie`}
              >
                Wsparcie
              </Link>
              <Link
                className="uppercase font-medium text-3xl hover:text-accent transition-colors"
                href="#contact"
              >
                Kontakt
              </Link>
            </SheetDescription>
          </SheetHeader>
          <SheetPrimitive.Close className="ring-offset-background cursor-pointer focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-8" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default NavMobile
