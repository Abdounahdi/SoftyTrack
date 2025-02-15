import { useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function SearchInput() {
  const [query, setqQery] = useState('')
  return (
    <div className="navbar_search_bar_container">
      <HiMagnifyingGlass />
      <input
        className="navbar_search_bar"
        type="text"
        name="search_bar"
        id="search_bar"
        placeholder="Search ... "
        value={query}
        onChange={(e) => setqQery(e.target.value)}
      />
    </div>
  )
}
