import { HiOutlineEye } from 'react-icons/hi2'
import CopyClipBoard from '../../shared/components/CopyClipBoard/CopyClipBoard'
import ProgressBySteps from '../../shared/components/ProgressBySteps/ProgressBySteps'
import TableActions from '../../shared/components/TableActions/TableActions'
import { TagCustomized } from '../../shared/components/TagCustomized/TagCustomized'
import { currencyFormat, numberWithSpaces } from '../../shared/utils/helpers'
import { useDeleteExpenseMutation } from './supabaseApi/expensesApi'

const paymentMethodColors = {
  cash: {
    bgColor: '#D4E8F9',
    textColor: '#0A53A8',
  },
  cheque: {
    bgColor: '#4A74D9',
    textColor: '#e7f1f8',
  },
  bankaccount: {
    bgColor: '#CFF2D2',
    textColor: '#30B73D',
  },
}

const trainingColors = {
  introwebdev: {
    bgColor: '#D4E8F9',
    textColor: '#0A53A8',
  },
  pythonforstudents: {
    bgColor: '#4A74D9',
    textColor: '#B7DAF3',
  },
  packpfee: {
    bgColor: '#A178FF',
    textColor: '#270083',
  },
  introwebdevkids: {
    bgColor: '#FEE3D0',
    textColor: '#B10202',
  },
  summerkids: {
    bgColor: '#D2E3E9',
    textColor: '#215A6C',
  },
  bootcampfullstack: {
    bgColor: '#9D3EE4',
    textColor: '#f3e2ff',
  },
}
const categoryColors = {
  pythonforstudents: {
    bgColor: '#4A74D9',
    textColor: '#B7DAF3',
  },
  packpfee: {
    bgColor: '#A178FF',
    textColor: '#270083',
  },
  food: {
    bgColor: '#FEE3D0',
    textColor: '#B10202',
  },
  summerkids: {
    bgColor: '#D2E3E9',
    textColor: '#215A6C',
  },
  bootcampfullstack: {
    bgColor: '#9D3EE4',
    textColor: '#f3e2ff',
  },
}

const locationColors = {
  shaloul: {
    bgColor: '#F1D8F9',
    color: '#613A8C',
  },
  hamemsousse: {
    bgColor: '#FEDD8F',
    color: '#753800',
  },
  takiacademy: {
    bgColor: '#D4E8F9',
    textColor: '#0A53A8',
  },
}

function getExpensesColumns(handleViewDetailsDashboard) {
  const [deleteExpense] = useDeleteExpenseMutation({})

  const expensesTableColumns = [
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 1,
      width: 200,
      fixed: true,
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 2,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 3,
      render: (price) => currencyFormat(price),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 5,
      render: (paymentMethod) => (
        <TagCustomized
          colors={paymentMethodColors[paymentMethod.replaceAll(' ', '').toLowerCase()] || {}}
        >
          {paymentMethod}
        </TagCustomized>
      ),
      width: 150,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 4,
      width: 150,
      render: (category) => (
        <TagCustomized colors={categoryColors[category.replaceAll(' ', '').toLowerCase()] || {}}>
          {category}
        </TagCustomized>
      ),
    },
    {
      title: 'Description ',
      dataIndex: 'description',
      key: 12,
    },
    {
      title: 'Actions',
      key: 13,
      dataIndex: 'key',
      render: (key) => <TableActions id={key} deleteAction={deleteExpense} />,
      fixed: 'right',
      width: 100,
    },
  ]

  const expensesTableColumnsDashboard = [
    {
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <TagCustomized colors={categoryColors[category.replaceAll(' ', '').toLowerCase()] || {}}>
          {category}
        </TagCustomized>
      ),
    },
    {
      dataIndex: 'price',
      key: 'price',
      render: (price) => currencyFormat(price),
      align: 'center',
    },
    {
      key: 2,
      dataIndex: 'key',
      render: (key) => (
        <button
          className="view_details_last_transaction"
          onClick={() => handleViewDetailsDashboard(key)}
        >
          <HiOutlineEye />
        </button>
      ),
    },
  ]

  return { expensesTableColumns, expensesTableColumnsDashboard }
}

export { getExpensesColumns }
