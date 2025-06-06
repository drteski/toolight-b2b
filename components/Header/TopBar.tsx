'use client'
import { Button } from '@/components/ui/button'
import Flags from '@/components/Icons/Flags'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import { locales } from '@/middleware'
import { XIcon } from 'lucide-react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

const TopBar = () => {
  const { label, code } = useCurrentLocale()
  return (
    <div className="bg-neutral-200">
      <div className="flex justify-between items-center my-0 mx-auto max-w-inner-wrapper px-padding py-2">
        <span className="text-neutral-500">tekst</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="text-foreground bg-neutral-200 hover:bg-neutral-300 border-neutral-200 cursor-pointer flex items-center gap-2"
            >
              <Flags country={code} />
              {label}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-screen sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Wybierz język</SheetTitle>
              <SheetDescription className="flex flex-col gap-1.5 py-10">
                {locales.map((locale) => {
                  if (locale.code === code)
                    return (
                      <Button
                        key={locale.code}
                        size="lg"
                        variant="link"
                        className="text-foreground items-center justify-start px-2 py-4 h-[unset] text-lg cursor-pointer"
                        asChild
                      >
                        <SheetClose>
                          <>
                            <Flags country={locale.code} className="size-6" /> {locale.label}
                          </>
                        </SheetClose>
                      </Button>
                    )
                  return (
                    <Button
                      key={locale.code}
                      size="lg"
                      variant="link"
                      className="text-foreground items-center justify-start px-2 py-4 h-[unset] text-lg"
                      asChild
                    >
                      <Link href={`/${locale.code}`}>
                        <Flags country={locale.code} className="size-6" /> {locale.label}
                      </Link>
                    </Button>
                  )
                })}
              </SheetDescription>
            </SheetHeader>
            <SheetPrimitive.Close className="ring-offset-background cursor-pointer focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
              <XIcon className="size-6" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default TopBar
