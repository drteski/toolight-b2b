'use client'

import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import useQueryParamsObject from '@/hooks/useQueryParamsObject'
import useSetQueryParam from '@/hooks/useSetQueryParam'

const FilterSelectField = ({ data }: { name: string; options: string[] }) => {
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
      const newValues = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]

      setQueryParam(name, newValues)
      return newValues
    })
  }

  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValues.length > 0 ? `${selectedValues.length} wybrano` : name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {options.map((option: string) => (
              <CommandItem key={option} onSelect={() => toggleValue(option)}>
                <div
                  className={cn(
                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                    selectedValues.includes(option)
                      ? 'bg-primary text-primary-foreground'
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

export default FilterSelectField
