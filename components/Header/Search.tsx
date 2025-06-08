import React from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import * as SheetPrimitive from '@radix-ui/react-dialog'

const Search = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="p-3">
          <SearchIcon className="flex xs:hidden text-neutral-900 size-8" />
          <div className="hidden xs:flex rounded-full cursor-pointer bg-neutral-100 pl-5 pr-10 py-3 items-center gap-2">
            <SearchIcon className="text-neutral-500 size-6" />
            <span className="text-neutral-500">Wyszukaj</span>
          </div>
        </SheetTrigger>
        <SheetContent aria-describedby="search" className="w-screen h-screen" side="top">
          <SheetHeader>
            <SheetTitle>
              <Input className="py-6 w-[calc(100dvw_-_80px)]" placeholder="Szukaj" />
            </SheetTitle>
            <div>dupa</div>
          </SheetHeader>
          <SheetPrimitive.Close className="ring-offset-background cursor-pointer focus:ring-ring data-[state=open]:bg-secondary absolute top-6 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-8" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Search
