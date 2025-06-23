import React from 'react'
import { Breadcrumbs } from '@/components/Header/Breadcrumbs'
import { SubPageProps } from '@/lib/types'
import { SubPageSelector } from '@/components/SubPageSelector'

export const metadata = {
  title: 'Toolight - Produkty',
  description:
    'Sprawdź najlepsze oświetlenie wewnętrzne w sklepie Toolight. W naszej ofercie: ☑️ lampy sufitowe ☑️ kinkiety ☑️ źródła światła - ☑️ Toolight Białystok',
}

const SubPage = async ({ params }: SubPageProps) => {
  const { lang, subpage } = await params

  return (
    <>
      <Breadcrumbs crumbs={[subpage]} locale={lang} />
      <SubPageSelector lang={lang} subpage={subpage} />
    </>
  )
}

export default SubPage
