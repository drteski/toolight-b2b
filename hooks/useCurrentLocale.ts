import { usePathname } from 'next/navigation'
import { locales } from '@/middleware'

const useCurrentLocale = () => {
  const pathname = usePathname()
  const currentLocale: {
    code: string
    label: string
  } = locales.filter((locale) => locale.code === pathname.split('/').filter(Boolean)[0])[0]
  
  return { code: currentLocale?.code, label: currentLocale?.label }
}
export default useCurrentLocale
