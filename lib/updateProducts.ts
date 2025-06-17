import axios from 'axios'
import payload from 'payload'
import payloadConfig from '@/payload.config'
import slugify from 'slugify'

export const updateProducts = async () => {
  try {
    await payload.init({ config: payloadConfig })

    if (!process.env.PRODUCT_FEED_URL) {
      return new Error('Brak URL feedu')
    }

    const res = await axios.get(process.env.PRODUCT_FEED_URL)
    const products = res.data
    const total = products.length

    let current = 0

    console.log(`🔄 Rozpoczynanie importu (${products.length} produktów)`)

    for await (const product of products) {
      current++
      const { b2b, sku, ean, b2bUrl, subiektTitle } = product

      const slug = slugify(subiektTitle, {
        lower: true,
        strict: true,
        trim: true,
      })

      try {
        const existingProduct = await payload.find({
          collection: 'products',
          where: { slug: { equals: slug } },
        })

        if (existingProduct.docs.length >= 0) {
          await payload.update({
            collection: 'products',
            where: { slug: { equals: slug } },
            data: {
              active: b2b,
              sku,
              ean,
              b2bUrl,
            },
          })
          console.log(`♻️  [${current}/${total}] Zaktualizowano produkt: ${subiektTitle})`)
        }
      } catch (innerError) {
        console.error(`❌ [${current}/${total}] Błąd przy produkcie ${subiektTitle}):`, innerError)
      }
    }

    console.log('✅ Import zakończony pomyślnie!')
  } catch (error) {
    console.error('🔥 Błąd główny uploadProducts:', error)
  }
}
