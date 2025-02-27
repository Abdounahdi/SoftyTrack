import { Dropdown } from 'antd'
import { HiOutlineFunnel } from 'react-icons/hi2'

export default function FilterTable({ className }) {
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

  const items: MenusProps['items'] = filterOptions.map((option) => {
    return {
      key: option.key,
      label: (
        <p
          key={option.key}
          className="filter_table_option"
          onClick={() => handleFilter(option.key)}
        >
          {option.label}
        </p>
      ),
    }
  })

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      arrow={{ pointAtCenter: true }}
      trigger="click"
    >
      <button className={`${className} table_filter`}>
        <HiOutlineFunnel />
        Filter
      </button>
    </Dropdown>
  )
}
