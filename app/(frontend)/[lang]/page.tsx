import Banner from '@/components/Banner'
import PopularCategories from '@/components/Main/PopularCategories'
import AboutUs from '@/components/Main/AboutUs'
import Contact from '@/components/Main/Contact'

export const metadata = {
  title: 'Toolight',
}
export default async function HomePage() {
  return (
    <>
      <Banner />
      <PopularCategories />
      <AboutUs />
      <Contact />
    </>
  )
}
