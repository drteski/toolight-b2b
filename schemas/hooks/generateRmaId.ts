// hookGenerateRmaId.ts
import { CollectionBeforeChangeHook } from 'payload'

/**
 * Hook generujący automatyczny numer RMA w formacie: XXX/MM/YYYY
 * gdzie XXX to kolejny numer, a MM/YYYY to bieżący miesiąc i rok
 */

/**
 * Hook generujący automatyczny numer RMA w formacie: XXX/MM/YYYY
 * gdzie XXX to kolejny numer, a MM/YYYY to bieżący miesiąc i rok
 */
export const generateRmaId: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  collection,
}) => {
  // Uruchamiaj hook tylko przy tworzeniu nowego dokumentu
  if (operation !== 'create') {
    return data
  }

  // Jeśli pole rmaId jest już ustawione, nie modyfikuj go
  if (data.rmaId) {
    return data
  }

  try {
    // Określ nazwę kolekcji jako string
    let collectionSlug: string

    // Sprawdź, czy collection jest obiektem czy stringiem
    if (typeof collection === 'object' && collection !== null) {
      // Jeśli to obiekt, spróbuj pobrać slug
      collectionSlug =
        collection.slug ||
        (collection as any).config?.slug ||
        req.collection ||
        req.url.split('/')[1] // Ostateczna próba pobrania z URL
    } else if (typeof collection === 'string') {
      // Jeśli to string, użyj go bezpośrednio
      collectionSlug = collection
    } else {
      // Fallback - użyj stałej nazwy kolekcji, jeśli znasz ją z góry
      // Zastąp 'rma' faktyczną nazwą kolekcji
      collectionSlug = 'rma'
    }

    console.log('Używana nazwa kolekcji:', collectionSlug)

    // Pobierz ostatni dokument posortowany wg rmaId malejąco
    const lastRMA = await req.payload.find({
      collection: collectionSlug,
      limit: 1,
      sort: '-createdAt', // Sortuj od najnowszego
      where: {
        rmaId: {
          exists: true,
        },
      },
    })

    let nextNumber = 1 // Domyślny numer startowy

    // Jeśli istnieją wcześniejsze dokumenty, pobierz ostatni numer
    if (lastRMA && lastRMA.docs && lastRMA.docs.length > 0) {
      const lastRmaId = lastRMA.docs[0].rmaId

      // Wyciągnij numer z ostatniego rmaId (część przed pierwszym slashem)
      if (lastRmaId) {
        const lastNumberStr = lastRmaId.split('/')[0]
        const lastNumber = parseInt(lastNumberStr, 10)

        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1
        }
      }
    }

    // Pobierz bieżący miesiąc i rok
    const now = new Date()
    const month = (now.getMonth() + 1).toString().padStart(2, '0') // Miesiące od 01-12
    const year = now.getFullYear()

    // Wygeneruj nowe rmaId w formacie: numer/miesiąc/rok
    data.rmaId = `${nextNumber}/${month}/${year}`
  } catch (error) {
    console.error('Błąd podczas generowania rmaId:', error)
    // W przypadku błędu, generuj bezpieczny fallback
    const now = new Date()
    const timestamp = now.getTime()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const year = now.getFullYear()
    data.rmaId = `${timestamp}/${month}/${year}`
  }

  return data
}
