import axios from 'axios'
import payload from 'payload'
import payloadConfig from '@/payload.config'
import { transformParameters } from '@/lib/transformParameters'

export const uploadProducts = async () => {
  return new Promise((resolve, reject) => {
    ;(async () => {
      try {
        await payload.init({ config: payloadConfig })
        const products = await axios
          .get(process.env.PRODUCT_FEED_URL === undefined ? '' : process.env.PRODUCT_FEED_URL)
          .then((res) => res.data)
        for await (const product of products.slice(400, 402)) {
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
            parameters,
          } = product
          const productParameters = transformParameters(parameters)
          console.log(titles)
          await payload.create({
            collection: 'products',
            data: {
              id,
              title: titles,
              active: b2b,
              sku,
              ean,
              description: descriptions,
              b2bUrl,
              parameters: productParameters,
            },
            locale: 'all',
          })
        }
        resolve('')
      } catch (error) {
        reject(error)
      }
    })()
  })
}
