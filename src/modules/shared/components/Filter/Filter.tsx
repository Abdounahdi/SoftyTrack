import { Segmented } from 'antd'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function Filter({field,  filterOptions, style }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleFilterParams = (key) => {
    console.log(key)
    searchParams.set(field, key)
    setSearchParams(searchParams)
  }
  useEffect(() => {
    if (!searchParams.get(field)) {
      searchParams.set(field, filterOptions.at(0).label)
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
      value={searchParams.get(field)}
    />
  )
}
