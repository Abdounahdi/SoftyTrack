import { HiOutlineFunnel } from 'react-icons/hi2'

export default function FilterTable({ className, onClick }) {
  const handleFilter = (filter) => {
    console.log(filter)
  }

  const filterOptions = [
    {
      key: 'date-asc',
      label: 'Date (Oldest First)',
    },
    {
      key: 'date-desc',
      label: 'Date (Recent First)',
    },
    {
      key: 'amount-asc',
      label: 'Amount (Smallest First)',
    },
    {
      key: 'amount-des',
      label: 'Amount (Largest First)',
    },
  ]

  return (
    <button className={`${className}`} onClick={onClick}>
      <HiOutlineFunnel />
      Filter
    </button>
  )
}
