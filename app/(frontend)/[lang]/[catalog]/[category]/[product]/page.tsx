const ProductPage = async ({ params }: { params: any }) => {
  const { lang, product } = await params
  return (
    <div className="bg-neutral-500">
      {lang}
      {product}
    </div>
  )
}

export default ProductPage
