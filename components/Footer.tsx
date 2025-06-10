'use client'
import React from 'react'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import RichTextRenderer from '@/components/RichText'

const Footer = ({ locale }: { locale: string }) => {
  const { data, isLoading } = useGetPayloadData('footer', true, locale)
  if (isLoading) return <Loading />
  return (
    <footer className="bg-neutral-100 mt-padding">
      <div className="max-w-inner-wrapper mx-auto pt-padding pb-20 px-padding grid grid-rows-2 xs:grid-rows-1 xs:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-1 text-sm">
          <span>{data.address.companyName}</span>
          <span>{data.address.address}</span>
          <span>
            {data.address.city} {data.address.postalCode}
          </span>
          <span>NIP: {data.address.nip}</span>
        </div>
        <div className="xs:justify-self-end">
          <Dialog>
            <DialogTrigger className="font-medium">{data.privacy.title}</DialogTrigger>
            <DialogContent className="max-w-[calc(100dvw_-_var(--spacing-padding))]! xs:max-w-[calc(70dvw_-_var(--spacing-padding))]!">
              <DialogHeader className="text-left">
                <DialogTitle>{data.privacy.title}</DialogTitle>
                <DialogFooter>
                  <div className="overflow-y-auto max-h-[calc(89dvh_-_var(--spacing-padding))] xs:max-h-[calc(70dvh_-_var(--spacing-padding))] privacy-content pr-padding py-padding">
                    <RichTextRenderer data={data.privacy.terms} />
                  </div>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  )
}

export default Footer
