const CatalogPage = async ({ params }: { params: any }) => {
  const { lang, catalog } = await params
  return (
    <div className="bg-neutral-500">
      {lang}
      {catalog}
    </div>
  )
}

export default CatalogPage
