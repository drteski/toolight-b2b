'use client'
import React from 'react'
import useCurrentLocale from '@/hooks/useCurrentLocale'
import useGetPayloadData from '@/hooks/useGetPayloadData'
import Loading from '@/app/(frontend)/[lang]/loading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ContactDataProps, ContactFormProps, Department, Personel } from '@/lib/types'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  postalCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  message: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})
const ContactForm = ({ layout }: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      postalCode: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {layout.contact.contactForm.contactCompany}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {layout.contact.contactForm.contactCity}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {layout.contact.contactForm.contactPostalCode}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {layout.contact.contactForm.contactMail}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {layout.contact.contactForm.contactPhone}
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {layout.contact.contactForm.contactText}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label>
          <span className="text-red-500">*</span> {layout.contact.contactForm.contactRequiredText}
        </Label>
        <Button type="submit">{layout.contact.contactForm.contactCta}</Button>
      </form>
    </Form>
  )
}

const ContactData = ({ locale, layout }: ContactDataProps) => {
  const { data, isLoading } = useGetPayloadData('contact', true, locale)
  if (isLoading) return <Loading />
  return (
    <>
      <div className="block xs:hidden">
        <Accordion
          className="flex flex-col gap-padding"
          defaultValue={data.departments[0].id}
          type="single"
          collapsible
        >
          {data.departments.map((item: Department) => (
            <AccordionItem
              className="p-padding bg-neutral-100 rounded-xl flex flex-col gap-[calc(var(--spacing-padding)/2)]"
              key={item.id}
              value={item.id}
            >
              <AccordionTrigger className="p-0 flex items-center hover:no-underline">
                <div className="flex items-center gap-[calc(var(--spacing-padding)/2)]">
                  <Image
                    src={item.icon.url}
                    width={item.icon.width}
                    height={item.icon.height}
                    alt={item.title}
                    className="object-cover object-center size-8"
                  />
                  <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="flex flex-col gap-[calc(var(--spacing-padding)/2)] pl-[calc(var(--spacing-padding)/2_+_32px)]">
                  {item.personel.map((person: Personel) => (
                    <div
                      className="flex flex-col gap-[calc(var(--spacing-padding)/2)]"
                      key={person.id}
                    >
                      <div className="flex flex-col">
                        <h3 className="font-medium text-xl">{person.person}</h3>
                        <span className="font-medium text-sm">{person.function}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {person.phone && (
                          <span className="flex gap-2 items-center">
                            <Phone className="size-4 text-accent" />
                            <Link
                              className="text-foreground text-sm"
                              href={`tel:${person.phone.replace(' ', '')}`}
                            >
                              {person.phone}
                            </Link>
                          </span>
                        )}
                        {person.email && (
                          <span className="flex gap-2 items-center">
                            <Mail className="size-4 text-accent" />
                            <Link
                              className="text-foreground text-sm"
                              href={`mailto:${person.email}`}
                            >
                              {person.email}
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {item.workingHours && (
                    <div className="flex flex-col">
                      <div className="font-sm font-medium">
                        {layout.contact.contactDetails.workingHours}:
                      </div>
                      <div className="font-xs">{item.workingHours}</div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="hidden xs:block">
        <Tabs orientation="vertical" defaultValue={data.departments[0].id} className="">
          <TabsList>
            {data.departments.map((item: Department)  => (
              <TabsTrigger key={item.id} className="w-full p-2" value={item.id}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.departments.map((item: Department) => (
            <TabsContent key={item.id} value={item.id}>
              <div className="flex flex-col gap-padding">
                <div className="flex gap-padding items-center">
                  <Image
                    className="size-12"
                    src={item.icon.url}
                    width={item.icon.width}
                    height={item.icon.height}
                    alt={item.title}
                  />
                  <h4 className="text-2xl font-medium">{item.title}</h4>
                </div>
                <div className="flex flex-col gap-[calc(var(--spacing-padding)/2)] pl-[calc(var(--spacing-padding)_+_48px)]">
                  {item.personel.map((person: Personel) => (
                    <div
                      className="flex flex-col gap-[calc(var(--spacing-padding)/2)]"
                      key={person.id}
                    >
                      <div className="flex flex-col">
                        <h3 className="font-medium text-2xl">{person.person}</h3>
                        <span className="font-medium text-sm">{person.function}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {person.phone && (
                          <span className="flex gap-2 items-center">
                            <Phone className="size-4 text-accent" />
                            <Link
                              className="text-foreground text-sm"
                              href={`tel:${person.phone.replace(' ', '')}`}
                            >
                              {person.phone}
                            </Link>
                          </span>
                        )}
                        {person.email && (
                          <span className="flex gap-2 items-center">
                            <Mail className="size-4 text-accent" />
                            <Link
                              className="text-foreground text-sm"
                              href={`mailto:${person.email}`}
                            >
                              {person.email}
                            </Link>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {item.workingHours && (
                    <div className="flex flex-col">
                      <div className="font-sm font-medium">
                        {layout.contact.contactDetails.workingHours}:
                      </div>
                      <div className="font-xs">{item.workingHours}</div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}

const Contact = () => {
  const { code } = useCurrentLocale()
  const { data, isLoading } = useGetPayloadData('layout', true, code)
  if (isLoading) return <Loading />
  return (
    <div id="contact" className="py-padding-vertical m-offset-padding">
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding">
        <h2 className="uppercase text-3xl xs:text-4xl font-bold">{data.sections.contact}</h2>
      </div>
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding hidden xs:grid xs:grid-cols-[3fr_8fr] lg:grid-cols-[2fr_3fr] xl:grid-cols-[1fr_1fr] gap-padding pt-padding">
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-medium">{data.contact.colaborationTitle}</h4>
          <p className="text-sm text-neutral-600">{data.contact.colaborationDescription}</p>
          <div>
            <ContactForm layout={data} />
          </div>
        </div>
        <ContactData locale={code} layout={data} />
      </div>
      <div className="max-w-inner-wrapper mx-auto my-0 px-padding grid xs:hidden grid-rows-[auto_auto] gap-padding-vertical pt-padding">
        <ContactData locale={code} layout={data} />
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-medium">{data.contact.colaborationTitle}</h4>
          <p className="text-sm text-neutral-600">{data.contact.colaborationDescription}</p>
          <div>
            <ContactForm layout={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
