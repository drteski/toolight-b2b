const ProductPage = async ({ params }: { params: any }) => {
  const { lang, catalog, category, product } = await params
  return (
    <div className="bg-neutral-500">
      {lang}
      {catalog}
      {category}
      {product}
    </div>
  )
}

export default ProductPage
