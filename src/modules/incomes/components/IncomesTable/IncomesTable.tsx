import { Spin, Table } from 'antd'
import { useState } from 'react'
import { useGetIncomesQuery } from '../../data/supabaseApi/incomesApi'
import { TagCustomized } from '../../../shared/components/TagCustomized/TagCustomized'
import { currencyFormat, numberWithSpaces } from '../../../shared/utils/helpers'

const paymentMethodColors = {
  cash: {
    bgColor: '#D4E8F9',
    textColor: '#0A53A8',
  },
  cheque: {
    bgColor: '#4A74D9',
    textColor: '#B7DAF3',
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

const columns = [
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
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
    title: 'Customer Phone',
    dataIndex: 'customerPhone',
    key: 3,
    render: (phoneNumber) => (
      <a href={`tel:${phoneNumber}`}>{numberWithSpaces(phoneNumber, '## ### ###')}</a>
    ),
  },
  {
    title: 'Customer Email',
    dataIndex: 'customerEmail',
    key: 4,
    width: 250,
    render: (email) => <a href={`mailto:${email}`}>{email}</a>,
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
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 6,
    render: (price) => currencyFormat(price),
  },
  {
    title: 'Total Slice',
    dataIndex: 'slicesTotalCount',
    key: 7,
  },
  {
    title: 'Slice Count',
    dataIndex: 'sliceCount',
    key: 8,
  },
  {
    title: 'Training',
    dataIndex: 'trainingName',
    key: 9,
    width: 200,
    render: (training) => (
      <TagCustomized colors={trainingColors[training.replaceAll(' ', '').toLowerCase()] || {}}>
        {training}
      </TagCustomized>
    ),
  },
  {
    title: 'Reception Location',
    dataIndex: 'location',
    key: 10,
    render: (location) => (
      <TagCustomized colors={locationColors[location.replaceAll(' ', '').toLowerCase()] || {}}>
        {location}
      </TagCustomized>
    ),
  },
  {
    title: 'Employee Name ',
    dataIndex: 'employeeName',
    key: 11,
  },
  {
    title: 'Description ',
    dataIndex: 'description',
    key: 12,
  },
  {
    title: 'Actions',
    key: 13,
    render: () => <p>...</p>,
    fixed: 'right',
    width: 100,
  },
]

export default function IncomesTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const { data, isLoading } = useGetIncomesQuery({})

  if (isLoading) return <Spin size="large" />

  const incomes = data?.map((income) => {
    return {
      dateCreated: new Intl.DateTimeFormat('en-CA').format(new Date(income.date_created)),
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
      key: income.id,
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

  console.log(data)

  return (
    <div className="table_incomes_container">
      {/* <div className="table_incomes_container__container"> */}
      <Table
        className="table_incomes"
        pagination={false}
        dataSource={incomes}
        columns={columns}
        rowSelection={{
          type: 'checkbox',
          fixed: true,
          ...rowSelection,
        }}
        scroll={{ x: 2000 }}
        loading={false}
      />
      {/* </div> */}
    </div>
  )
}
