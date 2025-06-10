interface CatalogPageProps {
  lang: string
  catalog: string
}

const CatalogPage = async ({ params }: { params: CatalogPageProps }) => {
  const { lang, catalog } = await params
  return (
    <div className="bg-neutral-500">
      {lang}
      {catalog}
    </div>
  )
}

export default CatalogPage
