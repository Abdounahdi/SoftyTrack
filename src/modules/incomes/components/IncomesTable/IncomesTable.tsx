import { Table } from 'antd'
import { useState } from 'react'
import { useGetIncomesQuery } from '../../data/supabaseApi/incomesApi'

const columns = [
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customreName',
    width: 200,
    fixed: true,
  },
  {
    title: 'Date',
    dataIndex: 'dateCreated',
    key: 'dateCreated',
  },
  {
    title: 'Customer Phone',
    dataIndex: 'customerPhone',
    key: 'customerPhone',
  },
  {
    title: 'Customer Email',
    dataIndex: 'customerEmail',
    key: 'customerEmail',
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Total Slice',
    dataIndex: 'slicesTotalCount',
    key: 'slicesTotalCount',
  },
  {
    title: 'Slice Count',
    dataIndex: 'sliceCount',
    key: 'sliceCount',
  },
  {
    title: 'Training',
    dataIndex: 'trainingName',
    key: 'trainingName',
  },
  {
    title: 'Reception Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Employee Name ',
    dataIndex: 'employeeName',
    key: 'employeeName',
  },
  {
    title: 'Description ',
    dataIndex: 'description',
    key: 'description',
  },
]

export default function IncomesTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const { data, isLoading } = useGetIncomesQuery({})

  if (isLoading) return <div>Loading</div>

  const preparedData = data?.map((income) => {
    console.log(income.date_created)
    return {
      dateCreated: income.date_created,
      customerName: income.customers.name,
      customerPhone: income.customers.phone,
      customerEmail: income.customers.email,
      paymentMethod: income.payment_method,
      slicesTotalCount: income.total_slices,
      sliceCount: income.slice_count,
      location: income.reception_location,
      description: income.description,
      trainingName: income.trainings.name,
      employeeName: income.user,
      price: income.price,
    }
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  return (
    <div className="table_incomes_container">
      <div className="table_incomes_container__container">
        <Table
          className="table_incomes"
          pagination={false}
          dataSource={preparedData}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            fixed: true,
            ...rowSelection,
          }}
        />
      </div>
    </div>
  )
}
