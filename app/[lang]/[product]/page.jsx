const ProductPage = async ({ params }) => {
	const {
		      lang,
		      product
	      } = await params;
	return <>{lang}{product}</>;
};

export default ProductPage;