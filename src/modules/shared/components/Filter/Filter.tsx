import { Dropdown, MenuProps, Segmented } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function Filter({ filterOptions, style }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleFilterParams = (key) => {
    console.log(key)
    searchParams.set('filter-by-time', key)
    setSearchParams(searchParams)
  }
  useEffect(() => {
    if (!searchParams.get('filter-by-time')) {
      searchParams.set('filter-by-time', filterOptions.at(0).key)
      setSearchParams(searchParams)
    }
  }, [])

  return (
    <Segmented
      className="filter_justify_end"
      options={filterOptions.map((option) => option.label)}
      onChange={(value) => {
        handleFilterParams(value) // string
      }}
    />
  )
}
