import React from 'react'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

const Search = ({ isSticky }) => {
  return (
    <div>
      <div className="relative">
        <SearchIcon
          className="absolute top-1/2 -translate-y-1/2 left-3.5 w-6 h-6 text-neutral-400 "
          size="24"
        />
        <Input
          className={`placeholder:text-neutral-400 py-8 pl-12 border-neutral-100 focus-visible:border-neutral-100 ${isSticky ? 'py-6' : 'py-8'}`}
          placeholder="Wpisz nazwę, kod lub ean produktu"
        />
      </div>
    </div>
  )
}

export default Search
