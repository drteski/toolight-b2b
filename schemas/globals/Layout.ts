import type { GlobalConfig } from 'payload'

export const Layout: GlobalConfig = {
  slug: 'layout',
  label: 'Zawartość strony',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'header',
          label: 'Nagłówek strony',
          fields: [
            {
              name: 'searchPlaceholder',
              label: 'Tekst na pasku wyszukiwania',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
          ],
        },
        {
          name: 'sections',
          label: 'Sekcje strony',
          fields: [
            {
              name: 'popularCategories',
              label: 'Nagłowek popularnych kategorii',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'aboutUs',
              label: 'Nagłówek o nas',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'contact',
              label: 'Nagłówek kontakt',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
          ],
        },
        {
          name: 'contact',
          label: 'Kontakt',
          fields: [
            {
              name: 'colaborationTitle',
              label: 'Nagłowek formularza',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'colaborationDescription',
              label: 'Opis formularza',
              type: 'textarea',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'contactForm',
              label: 'Fromularz kontaktowy',
              type: 'group',
              fields: [
                {
                  name: 'contactCompany',
                  label: 'Pole firma',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactCity',
                  label: 'Pole miejscowość',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactPostalCode',
                  label: 'Pole kod pocztowy',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactMail',
                  label: 'Pole email',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactPhone',
                  label: 'Pole telefon',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactText',
                  label: 'Pole treść',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactRequiredText',
                  label: 'Tekst pola obowiązkowego',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
                {
                  name: 'contactCta',
                  label: 'Zatwierdzenie formularza',
                  type: 'text',
                  localized: true,
                  defaultValue: '---',
                },
              ],
            },
          ],
        },
        {
          name: 'products',
          label: 'Produkty',
          fields: [
            {
              name: 'productHeading',
              label: 'Tekst wszystkie produkty',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productCount',
              label: 'Tekst liczba produktów',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productListingView',
              label: 'Tekst widoku',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productTagNew',
              label: 'Tekst tagu nowość',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productTagSale',
              label: 'Tekst tagu wyprzedaz',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productBtnCard',
              label: 'Tekst przycisku karty produktowej',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productBtnPrice',
              label: 'Tekst przycisku ceny produktu',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productDetails',
              label: 'Tekst parametrów produktu',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productDescription',
              label: 'Tekst opisu produktu',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'productDownload',
              label: 'Tekst pobierania plików z produktu',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
          ],
        },
        {
          name: 'pos',
          label: 'Punkty sprzedaży',
          fields: [
            {
              name: 'heading',
              label: 'Nagłówek punkty sprzedaży',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'searchPlaceholder',
              label: 'Tekst w wyszukiwarce',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'locationPlaceholder',
              label: 'Tekst linku do wskazówek dojazdu',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
          ],
        },
        {
          name: 'support',
          label: 'Wsparcie',
          fields: [
            {
              name: 'heading',
              label: 'Nagłówek wsparcia',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'searchPlaceholder',
              label: 'Tekst w wyszukiwarce',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
            {
              name: 'downloadBtn',
              label: 'Tekst przycisku pobierania',
              type: 'text',
              localized: true,
              defaultValue: '---',
            },
          ],
        },
      ],
    },
  ],
}
