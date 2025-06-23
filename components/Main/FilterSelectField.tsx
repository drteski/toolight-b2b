'use client'

import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useQueryParamsObject } from '@/hooks/useQueryParamsObject'
import { useSetQueryParam } from '@/hooks/useSetQueryParam'

export const FilterSelectField = ({ data }: { data: { name: string; options: string[] } }) => {
  const { name, options } = data
  const queryParams = useQueryParamsObject()
  const setQueryParam = useSetQueryParam()

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  useEffect(() => {
    if (queryParams) {
      const valuesFromURL = queryParams[name] || []
      return setSelectedValues(valuesFromURL)
    }
    return setSelectedValues([])
  }, [queryParams, name])

  const toggleValue = (value: string) => {
    setSelectedValues((prev) => {
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    })
  }
  useEffect(() => {
    setQueryParam(name, selectedValues)
  }, [selectedValues, setQueryParam, name])

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-white" asChild>
        <Button
          // variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={name}
          className="w-[200px] justify-between bg-white text-foreground border border-neutral-200 hover:bg-neutral-100 cursor-pointer"
        >
          {selectedValues.length > 0 ? `${selectedValues.length} wybrano` : name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] max-h-[200px] overflow-y-auto p-0 ">
        <Command>
          <CommandGroup>
            {options.map((option: string) => (
              <CommandItem
                className="hover:bg-neutral-200 hover:text-foreground"
                key={option}
                onSelect={() => toggleValue(option)}
              >
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-foreground',
                    selectedValues.includes(option)
                      ? 'bg-foreground text-neutral-200'
                      : 'opacity-50 [&_svg]:invisible',
                  )}
                >
                  <Check className="h-4 w-4" />
                </div>
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
