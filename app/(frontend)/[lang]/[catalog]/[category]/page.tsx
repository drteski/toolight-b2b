interface CategoryPageProps {
  lang: string
  catalog: string
  category: string
}

const CategoryPage = async ({ params }: { params: CategoryPageProps }) => {
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
