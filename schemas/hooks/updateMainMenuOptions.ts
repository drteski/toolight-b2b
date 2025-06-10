import type { FieldHook } from 'payload'

export const updateMainMenuOptions: FieldHook = async ({ data, req }) => {
  console.log(data, req.locale)
  try {
    const locale = req.locale || 'pl' // fallback na polski

    const response = await fetch(`http://localhost:3000/api/globals/main-menu?locale=${locale}`)
    const responseData = await response.json()
    const mainMenu = responseData?.mainMenu || []

    const menuOptions = mainMenu.map((link: {mainMenuLinkTitle:string,mainMenuLinkUrl:string, id: string}) => {
      return {
        label: `${link.mainMenuLinkTitle} (${link.mainMenuLinkUrl})`,
        value: link.mainMenuLinkUrl,
      }
    })
    return menuOptions
  //   // Opcjonalnie: ustawiamy domyślną kategorię, jeśli puste
  //   if (!data.mainMenuLink && menuOptions.length > 0) {
  //     data.mainMenuLink = menuOptions[0].value
  //   }
  //
  //   return data
  } catch (err) {
    console.error('Error fetching MainMenu in hook:', err)
    return [] // w razie błędu zwracamy dane bez zmian
  }
}
