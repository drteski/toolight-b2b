import React from 'react'
import Link from 'next/link'

const NavDesktop = ({ code }) => {
  return (
    <nav className="flex xs:gap-3 lg:gap-6 xl:gap-8 items-center">
      <Link
        className="uppercase font-medium text-sm hover:text-accent transition-colors"
        href={`/${code}/katalog`}
      >
        Produkty
      </Link>
      <Link
        className="uppercase font-medium text-sm hover:text-accent transition-colors"
        href="#about-us"
      >
        O nas
      </Link>
      <Link
        className="uppercase font-medium text-sm hover:text-accent transition-colors"
        href={`/${code}/punkty-sprzedazy`}
      >
        Punkty sprzedazy
      </Link>
      <Link
        className="uppercase font-medium text-sm hover:text-accent transition-colors"
        href={`/${code}/wsparcie`}
      >
        Wsparcie
      </Link>
      <Link
        className="uppercase font-medium text-sm hover:text-accent transition-colors"
        href="#contact"
      >
        Kontakt
      </Link>
    </nav>
  )
}

export default NavDesktop
