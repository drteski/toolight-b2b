import axios from 'axios'
import payload from 'payload'
import payloadConfig from '@/payload.config'
import { locales } from '@/middleware'
import slugify from 'slugify'
import axiosRetry from 'axios-retry'

export const uploadProducts = async () => {
  try {
    await payload.init({ config: payloadConfig })

    if (!process.env.PRODUCT_FEED_URL) {
      return Error('Brak URL feedu')
    }

    const res = await axios.get(process.env.PRODUCT_FEED_URL)
    const products = res.data
    const total = products.length * locales.length

    let current = 0

    console.log(
      `🔄 Rozpoczynanie importu ${total} pozycji (${products.length} produktów × ${locales.length} języków)`,
    )

    for await (const locale of locales) {
      console.log(`🌍 Przetwarzanie języka: ${locale.code}`)

      for await (const product of products) {
        current++
        const { id, b2b, sku, ean, b2bUrl, subiektTitle, descriptions, images, parameters } =
          product

        const slug = slugify(subiektTitle, {
          lower: true,
          strict: true,
          trim: true,
        })

        try {
          const existingProduct = await payload.find({
            collection: 'products',
            where: { slug: { equals: slug }, sku: { equals: sku } },
          })

          const commonData = {
            slug,
            subiektId: id,
            title: subiektTitle,
            // titles[locale.code] === '' ? `${subiektTitle} ${locale.code}` : titles[locale.code],
            active: b2b,
            sku,
            ean,
            b2bUrl,
          }

          if (existingProduct.docs.length <= 0) {
            const uploads: { image: number; featured: boolean }[] = []
            let i: number = 1
            for await (const image of images) {
              axiosRetry(axios, { retries: 3 })
              const res = await axios.get(image, {
                responseType: 'arraybuffer',
                timeout: 5000,
              })
              const data: Buffer<ArrayBufferLike> = Buffer.from(res.data, 'binary')
              const size: number = res.headers['content-length']
              const mimetype: string = res.headers['content-type']
              const name: string = `${subiektTitle} ${i}`
              const uploadedImage = await payload.create({
                collection: 'media',
                data: {},
                file: {
                  data,
                  name,
                  mimetype,
                  size,
                },
              })
              uploads.push({ image: uploadedImage.id, featured: i === 1 })
              i++
            }

            await payload.create({
              collection: 'products',
              data: {
                ...commonData,
                description: descriptions[locale.code],
                parameters: parameters[locale.code],
                gallery: uploads,
              },
              // @ts-ignore
              locale: locale.code,
            })
            console.log(
              `🆕 [${current}/${total}] Utworzono produkt: ${subiektTitle} (${locale.code})`,
            )
          } else {
            await payload.update({
              collection: 'products',
              where: { slug: { equals: slug } },
              data: {
                ...commonData,
                description: descriptions[locale.code],
                parameters: parameters[locale.code],
              },
              // @ts-ignore
              locale: locale.code,
            })
            console.log(
              `♻️  [${current}/${total}] Zaktualizowano produkt: ${subiektTitle} (${locale.code})`,
            )
          }
        } catch (innerError) {
          console.error(
            `❌ [${current}/${total}] Błąd przy produkcie ${subiektTitle} (${locale.code}):`,
            innerError,
          )
        }
      }
    }

    console.log('✅ Import zakończony pomyślnie!')
  } catch (error) {
    console.error('🔥 Błąd główny uploadProducts:', error)
  }
}
