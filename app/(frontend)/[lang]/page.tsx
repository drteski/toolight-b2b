import Banner from '@/components/Main/Banner'
import PopularCategories from '@/components/Main/PopularCategories'
import AboutUs from '@/components/Main/AboutUs'
import Contact from '@/components/Main/Contact'

export const metadata = {
  title: 'Toolight',
}
const HomePage = () => {
  return (
    <>
      <Banner />
      <PopularCategories />
      <AboutUs />
      <Contact />
    </>
  )
}

export default HomePage
