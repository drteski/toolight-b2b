'use client'
import React from 'react'
import Logo from '@/components/Header/Logo'
import Link from 'next/link'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import { useWindowScrollY } from '@/hooks/useWindowScrollY'
import NavDesktop from '@/components/Header/NavDesktop'
import Search from '@/components/Header/Search'
import NavMobile from '@/components/Header/NavMobile'

const Navbar = () => {
  const { code } = useCurrentLocale()
  const scrollY = useWindowScrollY()

  const isSticky = scrollY > 10
  return (
    <div
      className={`border-1 ${isSticky ? 'border-white shadow-2xl shadow-neutral-500/20' : 'border-neutral-200'} border-b sticky top-0 z-10 transition-all`}
    >
      <div
        className={`grid xs:hidden my-0 mx-auto max-w-inner-wrapper px-padding ${isSticky ? 'py-1' : 'py-4'} grid-cols-[1fr_auto_auto] gap-2 items-center justify-between transition-all`}
      >
        <Link href={`/${code}`}>
          <Logo className={`${isSticky ? 'h-8' : 'h-8 lg:h-12 xl:h-16'} transition-all`} />
        </Link>
        <Search isSticky={isSticky} />
        <NavMobile code={code} />
      </div>
      <div
        className={`hidden xs:grid my-0 mx-auto max-w-inner-wrapper px-padding ${isSticky ? 'py-4' : 'xs:py-6 lg:py-8 xl:py-12'} grid-cols-[1fr_auto_auto] gap-16 items-center justify-between transition-all`}
      >
        <Link href={`/${code}`}>
          <Logo className={`${isSticky ? 'h-8' : 'h-8 lg:h-12 xl:h-16'} transition-all`} />
        </Link>
        <Search isSticky={isSticky} />
        <NavDesktop code={code} />
      </div>
    </div>
  )
}

export default Navbar
