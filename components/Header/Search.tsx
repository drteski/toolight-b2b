import React from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
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
import Loading from '@/app/(frontend)/[lang]/loading'
import useGetPayloadData from '@/hooks/useGetPayloadData'

const Search = ({ code }: { code: string }) => {
  const { data, isLoading } = useGetPayloadData('layout', true, code)
  if (isLoading) return <Loading />
  return (
    <div>
      <Drawer direction="top">
        <DrawerTrigger className="flex items-center justify-center p-2 xs:p-0">
          <SearchIcon className="flex xs:hidden text-foreground size-8" />
          <div className="hidden xs:flex rounded-full cursor-pointer bg-neutral-100 pl-5 pr-10 py-3 items-center gap-2">
            <SearchIcon className="text-neutral-500 size-6" />
            <span className="text-neutral-500">{data.header.searchPlaceholder}</span>
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-screen lg:max-w-[calc(var(--spacing-inner-wrapper)_-_2_*_var(--spacing-padding))] mx-auto my-0">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex items-center gap-4">
                <Input className="py-6 " placeholder={data.header.searchPlaceholderDropdown} />
                <DrawerClose>
                  <XIcon className="size-8" />
                </DrawerClose>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className=""></DrawerDescription>
          <DrawerFooter className="h-[100px]">
            {/*<Button>Submit</Button>*/}
            <DrawerClose>{/*<Button variant="outline">Cancel</Button>*/}</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Search
