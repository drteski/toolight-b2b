import './globals.css'
import { ReactNode } from 'react'
import { Providers } from '@/components/Providers'
import TopBar from '@/components/Header/TopBar'
import Navbar from '@/components/Header/Navbar'
import Footer from '@/components/Footer'

const RootLayout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: string }
}) => {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body className="antialiased">
        <Providers>
          <TopBar locale={lang} />
          <Navbar locale={lang} />
          <main>{children}</main>
          <Footer locale={lang} />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
