'use client'
import React from 'react'
import Link from 'next/link'

interface MenuItem {
  mainMenuLinkTitle: string
  mainMenuLinkUrl: string
}

const NavDesktop = ({ code, items }: { code: string; items: MenuItem[] }) => {
  return (
    <nav className="flex xs:gap-3 lg:gap-6 xl:gap-8 items-center">
      {items.map((item) => (
        <Link
          key={item.mainMenuLinkUrl}
          className="uppercase font-medium text-sm hover:text-accent transition-colors"
          href={`/${code}/${item.mainMenuLinkUrl}`}
        >
          {item.mainMenuLinkTitle}
        </Link>
      ))}
    </nav>
  )
}

export default NavDesktop
