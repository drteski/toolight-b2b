import axios from 'axios';
import payload from 'payload';
import payloadConfig from '@/payload.config';
import { transformParameters } from '@/lib/transformParameters';
import { locales } from '@/middleware';
import slugify from 'slugify';

export const uploadProducts = async () => {
	return new Promise((resolve, reject) => {
		(async () => {
			try {
				await payload.init({ config: payloadConfig });

				if (!process.env.PRODUCT_FEED_URL) {
					throw new Error('Brak URL feedu');
				}

				const res = await axios.get(process.env.PRODUCT_FEED_URL);
				const products = res.data;
				const total = products.length * locales.length;

				let current = 0;

				console.log(`🔄 Rozpoczynanie importu ${total} pozycji (${products.length} produktów × ${locales.length} języków)`);

				for await (const locale of locales) {
					console.log(`🌍 Przetwarzanie języka: ${locale.code}`);

					for await (const product of products) {
						current++;
						const {
							id,
							b2b,
							sku,
							ean,
							stock,
							b2bUrl,
							subiektTitle,
							productGroup,
							titles,
							variantNames,
							descriptions,
							producer,
							images,
							parameters
						} = product;

						const slug = slugify(subiektTitle, {
							lower: true,
							strict: true,
							trim: true
						});

						try {
							const existingProduct = await payload.find({
								collection: 'products',
								where: { slug: { equals: slug } }
							});

							const commonData = {
								slug,
								subiektId: id,
								title: subiektTitle,
								active: b2b,
								sku,
								ean,
								b2bUrl
							};

							if (existingProduct.docs.length <= 0) {
								await payload.create({
									collection: 'products',
									data: {
										...commonData,
										description: descriptions[locale.code],
										parameters: parameters[locale.code]
									}
								});
								console.log(`🆕 [${current}/${total}] Utworzono produkt: ${subiektTitle} (${locale.code})`);
							} else {
								await payload.update({
									collection: 'products',
									where: { slug: { equals: slug } },
									data: {
										active: b2b,
										sku,
										ean,
										b2bUrl
									}
								});
								console.log(`♻️  [${current}/${total}] Zaktualizowano produkt: ${subiektTitle} (${locale.code})`);
							}
						} catch (innerError) {
							console.error(`❌ [${current}/${total}] Błąd przy produkcie ${subiektTitle} (${locale.code}):`, innerError.message);
						}
					}
				}

				console.log('✅ Import zakończony pomyślnie!');
				resolve('Zaktualizowane');
			} catch (error) {
				console.error('🔥 Błąd główny uploadProducts:', error);
				reject(error);
			}
		})();
	});
};
