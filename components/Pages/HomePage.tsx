import React from 'react'
import Banner from '@/components/Main/Banner'
import PopularCategories from '@/components/Main/PopularCategories'
import AboutUs from '@/components/Main/AboutUs'
import Contact from '@/components/Main/Contact'

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
