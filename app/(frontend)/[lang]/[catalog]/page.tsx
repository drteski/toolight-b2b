import Breadcrumbs from '@/components/Header/Breadcrumbs'

interface CatalogPageProps {
  lang: string
  catalog: string
}

const CatalogPage = async ({ params }: { params: CatalogPageProps }) => {
  const { lang, catalog } = await params
  return (
    <Breadcrumbs
      locale={lang}
      crumbs={[
        { title: 'Strona główna', url: `/${lang}` },
        { title: catalog, url: `/${lang}/${catalog}` },
      ]}
    />
  )
}

export default CatalogPage
