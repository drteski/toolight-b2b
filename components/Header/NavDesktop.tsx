'use client'
import React from 'react'
import Link from 'next/link'
import { MainMenuItem } from '@/lib/types'

type NavProps = {
  locale: string
  items: MainMenuItem[]
}

export const NavDesktop = ({ locale, items }: NavProps) => {
  return (
    <nav className="flex xs:gap-3 lg:gap-6 xl:gap-8 items-center">
      {items.map((item) => (
        <Link
          key={item.id}
          className="uppercase font-medium text-sm hover:text-accent transition-colors"
          href={`/${locale}/${item.mainMenuLinkUrl}`}
        >
          {item.mainMenuLinkTitle}
        </Link>
      ))}
    </nav>
  )
}
