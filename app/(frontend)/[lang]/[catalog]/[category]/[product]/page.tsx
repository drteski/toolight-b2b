type ProductPageParams = {
  lang: string
  catalog: string
  category: string
  product: string
}

type ProductPageProps = {
  params: ProductPageParams
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { lang, catalog, category, product } = await params

  return (
    <div className="bg-neutral-500 text-white p-4">
      <p>Language: {lang}</p>
      <p>Catalog: {catalog}</p>
      <p>Category: {category}</p>
      <p>Product: {product}</p>
    </div>
  )
}

export default ProductPage
