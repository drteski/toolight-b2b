import { CollectionBeforeChangeHook } from 'payload'

const generateRmaId: CollectionBeforeChangeHook = async ({ data, req, operation, collection }) => {
  console.log(data, req, operation, collection)
  if (operation !== 'create') {
    return data
  }

  if (data.rmaId) {
    return data
  }

  try {
    let collectionSlug: string

    if (typeof collection === 'object' && collection !== null) {
      collectionSlug =
        collection.slug ||
        (collection as any).config?.slug ||
        req.collection ||
        req.url.split('/')[1]
    } else if (typeof collection === 'string') {
      collectionSlug = collection
    } else {
      collectionSlug = 'rma'
    }

    console.log('Używana nazwa kolekcji:', collectionSlug)

    const lastRMA = await req.payload.find({
      collection: collectionSlug,
      limit: 1,
      sort: '-createdAt',
      where: {
        rmaId: {
          exists: true,
        },
      },
    })

    let nextNumber = 1

    if (lastRMA && lastRMA.docs && lastRMA.docs.length > 0) {
      const lastRmaId = lastRMA.docs[0].rmaId

      if (lastRmaId) {
        const lastNumberStr = lastRmaId.split('/')[0]
        const lastNumber = parseInt(lastNumberStr, 10)

        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1
        }
      }
    }

    const now = new Date()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()

    data.rmaId = `${nextNumber}/${month}/${year}`
  } catch (error) {
    console.error('Błąd podczas generowania rmaId:', error)
    const now = new Date()
    const timestamp = now.getTime()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()
    data.rmaId = `${timestamp}/${month}/${year}`
  }

  return data
}

export default generateRmaId
