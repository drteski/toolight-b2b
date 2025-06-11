'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const orientationClass =
    orientation === 'horizontal'
      ? 'flex flex-col'
      : orientation === 'vertical'
        ? 'flex flex-row-reverse'
        : 'flex flex-col'
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('group', orientationClass, 'gap-2', className)}
      orientation={orientation}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'group-data-[orientation=horizontal]:inline-flex',
        'group-data-[orientation=horizontal]:items-center',
        'group-data-[orientation=horizontal]:justify-center',
        'group-data-[orientation=vertical]:flex',
        'group-data-[orientation=vertical]:flex-col',
        'group-data-[orientation=vertical]:items-center',
        'group-data-[orientation=vertical]:justify-start',
        'h-fit w-fit rounded-lg gap-4',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer bg-neutral-100 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary/80 hover:bg-neutral-200 data-[state=active]:text-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
