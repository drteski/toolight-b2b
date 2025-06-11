'use client'
import React from 'react'
import Logo from '@/components/Header/Logo'
import Link from 'next/link'
import { useWindowScrollY } from '@/hooks/useWindowScrollY'
import NavDesktop from '@/components/Header/NavDesktop'
import Search from '@/components/Header/Search'
import NavMobile from '@/components/Header/NavMobile'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import { Locale, MainMenuOrder } from '@/lib/types'

const Navbar = ({ locale }: Locale) => {
  const scrollY = useWindowScrollY()
  const { data, isLoading } = useGetPayloadData('main-menu', false, locale)
  const isSticky = scrollY > 10
  if (isLoading) return <Loading />
  const menuItems = data.docs.sort(
    (a: MainMenuOrder, b: MainMenuOrder) => a.mainMenuOrder - b.mainMenuOrder,
  )
  return (
    <div
      className={`border-b-1 ${isSticky ? 'border-white shadow-2xl shadow-neutral-500/20' : 'border-neutral-200'} bg-background border-b sticky top-0 z-10 transition-all`}
    >
      <div
        className={`grid xs:hidden my-0 mx-auto max-w-inner-wrapper px-padding ${isSticky ? 'py-1' : 'py-4'} grid-cols-[1fr_auto_auto] gap-2 items-center justify-between transition-all`}
      >
        <Link href={`/${locale}`}>
          <Logo className={`${isSticky ? 'h-8' : 'h-8 lg:h-12 xl:h-16'} transition-all`} />
        </Link>
        <Search code={locale} />
        <NavMobile code={locale} items={menuItems} />
      </div>
      <div
        className={`hidden xs:grid my-0 mx-auto max-w-inner-wrapper px-padding ${isSticky ? 'py-2' : 'xs:py-6 lg:py-8 xl:py-10'} grid-cols-[1fr_auto_auto] gap-18 items-center justify-between transition-all`}
      >
        <Link href={`/${locale}`}>
          <Logo className={`${isSticky ? 'h-8' : 'h-8 lg:h-12 xl:h-16'} transition-all`} />
        </Link>
        <NavDesktop code={locale} items={menuItems} />
        <Search code={locale} />
      </div>
    </div>
  )
}

export default Navbar
