'use client'
import React from 'react'
import Logo from '@/components/Header/Logo'
import Link from 'next/link'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import { useWindowScrollY } from '@/hooks/useWindowScrollY'
import NavDesktop from '@/components/Header/NavDesktop'
import Search from '@/components/Header/Search'
import useWindowSize from '@/hooks/useWindowSize'
import NavMobile from '@/components/Header/NavMobile'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

const Navbar = () => {
  const { code } = useCurrentLocale()
  const scrollY = useWindowScrollY()
  const { width } = useWindowSize()

  const isSticky = scrollY > 10
  return (
    <div
      className={`border-1 ${isSticky ? 'border-white shadow-2xl shadow-neutral-500/20' : 'border-neutral-200'} border-b sticky top-0 z-10 transition-all`}
    >
      <div
        className={`my-0 mx-auto max-w-inner-wrapper px-padding ${isSticky ? 'py-1 xs:py-4' : 'py-4 xs:py-12'} grid grid-cols-[1fr_auto_auto] xs:grid-cols-[auto_1fr_auto] gap-2 xs:gap-8 lg:gap-14 xl:gap-16 items-center justify-between transition-all`}
      >
        <Link href={`/${code}`}>
          <Logo className={`${isSticky ? 'h-8' : 'h-8 lg:h-12 xl:h-16'} transition-all`} />
        </Link>
        {width <= 990 ? (
          <>
            <Button>
              <SearchIcon />
            </Button>
            <NavMobile code={code} />
          </>
        ) : (
          <>
            <Search isSticky={isSticky} />
            <NavDesktop code={code} />
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
