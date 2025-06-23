import React from 'react'
import { Button } from '@/components/ui/button'
import { DollarSign } from 'lucide-react'
import Link from 'next/link'

type ProductCtaProps = {
  device: string
  layout: { productBtnCard: string; productBtnPrice: string }
  data: {
    b2bUrl: string
  }
}
export const ProductCta = ({ device, layout, data }: ProductCtaProps) => {
  if (device === 'mobile')
    return (
      <div className="fixed bottom-0 left-0 right-0 flex gap-2 p-padding bg-white items-center justify-end">
        {/*<Button className="cursor-pointer w-1/2" variant="secondary">*/}
        {/*  <DownloadIcon size={4} />*/}
        {/*  {layout.productBtnCard}*/}
        {/*</Button>*/}
        <Button className="cursor-pointer w-1/2 text-foreground" asChild>
          <Link href={data.b2bUrl} target="_blank">
            <DollarSign size={4} />
            {layout.productBtnPrice}
          </Link>
        </Button>
      </div>
    )
  if (device === 'desktop')
    return (
      <div className="flexgap-2 pr-padding">
        {/*<Button className="cursor-pointer" variant="secondary">*/}
        {/*  <DownloadIcon size={4} />*/}
        {/*  {layout.productBtnCard}*/}
        {/*</Button>*/}
        <Button className="cursor-pointer text-foreground" asChild>
          <Link href={data.b2bUrl} target="_blank">
            <DollarSign size={4} />
            {layout.productBtnPrice}
          </Link>
        </Button>
      </div>
    )
}
