import { Table as TableAntD } from 'antd'
import Card from '../Card/Card'
import { getIncomesColumns } from '../../../incomes/data/IncomesTableColumns'
import { useNavigate } from 'react-router'

export default function LastTransactions({ title, viewPath }) {
  const navigate = useNavigate()
  const handleViewDetails = (key) => {
    console.log(key)
    navigate(`${viewPath}/view/${key}`)
  }
  const { icnomesTableColumnsDashboard: columns } = getIncomesColumns(handleViewDetails)

  const data: DataType[] = [
    {
      key: 1,
      training: 'training',
      price: 12200,
      slicesPrecentage: '2-1',
      customerName: 'abdou',
    },
    {
      key: 2,
      training: 'training',
      price: 12200,
      slicesPrecentage: '2-1',
      customerName: 'abdou',
    },
    {
      key: 3,
      training: 'training',
      price: 12200,
      slicesPrecentage: '2-1',
      customerName: 'abdou',
    },
    {
      key: 3,
      training: 'training',
      price: 12200,
      slicesPrecentage: '2-1',
      customerName: 'abdou',
    },
    {
      key: 3,
      training: 'training',
      price: 12200,
      slicesPrecentage: '2-1',
      customerName: 'abdou',
    },

  ]

  return (
    <Card className="last_transaction_card">
      <h2 className="last_transactions_title">{title}</h2>
      <TableAntD
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
        className="antd_table_last_transactions"
      />
    </Card>
  )
}
