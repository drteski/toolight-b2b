import React from 'react'

export type CurrentLocale = { label: string; code: string }
export type Locale = { locale: string }

export type SubPageProps = {
  children: React.ReactNode
  params: {
    lang: string
    subpage: string
  }
}

export type CategoryPageProps = {
  params: {
    lang: string
    subpage: string
    category: string
  }
}
export type ProductPageProps = {
  params: {
    lang: string
    subpage: string
    category: string
    product: string
  }
}

// HOOKS

export type WindowSize = {
  width: number
  height: number
}

// COMPONENTS

export type ComponentProps = {
  country?: string
  style?: React.CSSProperties
  className?: string
}

export type NavProps = {
  code: string
  items: MainMenuItem[]
}

export type FlagProps = {
  country: string
  className?: string
}

export type BannerProps = {
  banners: BannerItem[]
}

export type ContactFormProps = {
  layout: Layout
}
export type ContactDataProps = {
  locale: string
  layout: Layout
}

export type BreadcrumbsProps = {
  locale: string
  crumbs: string[]
  crumb?: string
}

export type BreadcrumbProps = {
  locale: string
  crumb: string
}

// PAYLOAD DATA

export type MainMenuOrder = { mainMenuOrder: number }
export type MainMenuItem = {
  id: string
  mainMenuLinkTitle: string
  mainMenuLinkUrl: string
}
export type Category = {
  title: string
  slug: string
  sizes: {
    thumbnail: {
      url: string
      width: number
      height: number
    }
  }
  relatedMainMenuLink: {
    mainMenuLinkUrl: string
  }
}

export type BannerItem = {
  id: string
  title: string
  sizes: {
    main: {
      url: string
      width: number
      height: number
    }
  }
}

export type AboutUsItem = {
  title: string
  description: string
  icon: {
    url: string
    width: number
    height: number
  }
}

export type Layout = {
  header: LayoutHeader
  banners: LayoutBanners
  sections: LayoutSections
  contact: LayoutContact
  products: LayoutProducts
  pos: LayoutPOS
  support: LayoutSupport
}

export type LayoutHeader = {
  searchPlaceholder: string
  searchPlaceholderDropdown: string
}

export type LayoutBanners = {
  bannerAutoplay: boolean
  bannerAutoplayDelay: number
}

export type LayoutSections = {
  popularCategories: string
  aboutUs: string
  contact: string
}

export type LayoutContact = {
  colaborationTitle: string
  colaborationDescription: string
  contactForm: LayoutContactForm
  contactDetails: LayoutContactDetails
}

export type LayoutContactForm = {
  contactCompany: string
  contactCity: string
  contactPostalCode: string
  contactMail: string
  contactPhone: string
  contactText: string
  contactRequiredText: string
  contactCta: string
}

export type LayoutContactDetails = {
  workingHours: string
}

export type LayoutProducts = {
  productHeading: string
  productCount: string
  productListingView: string
  productTagNew: string
  productTagSale: string
  productBtnCard: string
  productBtnPrice: string
  productDetails: string
  productDescription: string
  productDownload: string
}

export type LayoutPOS = {
  heading: string
  searchPlaceholder: string
  locationPlaceholder: string
}

export type LayoutSupport = {
  heading: string
  searchPlaceholder: string
  downloadBtn: string
}

export type Contact = {
  departments: Department[]
}

export type Department = {
  id: string
  icon: Media
  title: string
  personel: Personel[]
  workingHours: string
}

export type Personel = {
  id: string
  person: string
  function: string
  phone: string
  email: string
}

export type Media = {
  id: string
  url: string
  width: number
  height: number
  filename: string
  mimeType?: string
}
