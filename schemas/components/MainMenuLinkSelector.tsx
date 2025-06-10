'use client'

import React, { useEffect, useState } from 'react'
import { SelectInput, FieldLabel } from '@payloadcms/ui'

// Typ MainMenuLink
interface MainMenuLink {
  mainMenuLinkTitle: Record<string, string> | string
  mainMenuLinkUrl: Record<string, string> | string
}

interface MainMenuLinkSelectorProps {
  path: string
  label?: string
  value: string
  onInputChange: (val: any) => void
  readOnly?: boolean
  locale: string
}

export const MainMenuLinkSelector: React.FC<MainMenuLinkSelectorProps> = ({
  path,
  label,
  value,
  onInputChange,
  readOnly,
  locale,
}) => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMainMenuData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/globals/main-menu?locale=${locale}`)
      const data = await response.json()

      const menuOptions = (data.mainMenu || []).map((link: MainMenuLink) => {
        const title =
          typeof link.mainMenuLinkTitle === 'object'
            ? link.mainMenuLinkTitle[locale]
            : link.mainMenuLinkTitle

        const url =
          typeof link.mainMenuLinkUrl === 'object'
            ? link.mainMenuLinkUrl[locale]
            : link.mainMenuLinkUrl

        return {
          label: `${title} (${url})`,
          value: url,
        }
      })

      setOptions(menuOptions)
    } catch (err) {
      console.error('Error fetching MainMenu data:', err)
      setError('Nie udało się załadować linków z Menu Głównego.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMainMenuData()
  }, [locale]) // ważne: jeśli zmienisz locale → załaduj nowe dane

  return (
    <div>
      <FieldLabel htmlFor={path} label={label} />
      {loading ? (
        <p>Ładowanie linków...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <SelectInput
          path={path}
          name={path}
          options={options}
          value={value}
          onInputChange={(selected) => onInputChange(selected?.value ?? '')} // pozwól wyczyścić
          readOnly={readOnly}
          isClearable={true}
          placeholder="Wybierz link z Menu Głównego"
        />
      )}
    </div>
  )
}
