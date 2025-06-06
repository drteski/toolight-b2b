import { FieldHook } from 'payload'
import slugify from 'slugify'

const generateSlug =
  (sourceField = 'title'): FieldHook =>
  ({ data, siblingData, originalDoc, value }) => {
    try {
      // Sprawdzamy czy pole źródłowe jest zlokalizowane
      const isSourceLocalized =
        (siblingData?.[sourceField] && typeof siblingData[sourceField] === 'object') ||
        (data?.[sourceField] && typeof data[sourceField] === 'object')

      // Sprawdzamy czy wartość docelowa jest zlokalizowana
      const isValueLocalized = value && typeof value === 'object'

      // Pobieramy wartość źródłową
      let sourceValue

      if (isSourceLocalized) {
        // Jeśli źródło jest zlokalizowane, bierzemy domyślny język (pl)
        if (siblingData?.[sourceField]?.pl) {
          sourceValue = siblingData[sourceField].pl
        } else if (data?.[sourceField]?.pl) {
          sourceValue = data[sourceField].pl
        } else if (originalDoc?.[sourceField]?.pl) {
          sourceValue = originalDoc[sourceField].pl
        }
      } else {
        // Jeśli źródło nie jest zlokalizowane, bierzemy wartość bezpośrednio
        sourceValue =
          siblingData?.[sourceField] || data?.[sourceField] || originalDoc?.[sourceField]
      }

      // Jeśli mamy wartość źródłową, generujemy slug
      if (sourceValue && typeof sourceValue === 'string' && sourceValue.trim() !== '') {
        const newSlug = slugify(sourceValue, {
          lower: true,
          strict: true,
          trim: true,
        })

        // Zwracamy wartość w odpowiednim formacie
        if (isValueLocalized) {
          // Jeśli wartość docelowa jest zlokalizowana, tworzymy obiekt z tym samym slugiem dla wszystkich języków
          const result = { ...value }

          // Aktualizujemy wartość dla każdego klucza (języka) w obiekcie
          Object.keys(result).forEach((lang) => {
            result[lang] = newSlug
          })

          // Upewniamy się, że przynajmniej polski język jest ustawiony
          if (!result.pl) {
            result.pl = newSlug
          }

          return result
        } else {
          // Jeśli wartość docelowa nie jest zlokalizowana, zwracamy prosty string
          return newSlug
        }
      }

      // Jeśli nie udało się wygenerować sluga, zwracamy oryginalną wartość
      return value
    } catch (error) {
      console.error('Błąd w hooku generateSlug:', error)
      return value // W przypadku błędu, zwróć niezmienioną wartość
    }
  }

export default generateSlug
