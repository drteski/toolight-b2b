const CategoryPage = async ({ params }: { params: any }) => {
  const { lang, catalog, category } = await params
  return (
    <>
      {lang}
      {catalog}
      {category}
    </>
  )
}

export default CategoryPage
