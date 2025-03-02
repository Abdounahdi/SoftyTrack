// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { HiOutlineEye } from 'react-icons/hi2'
import CopyClipBoard from '../../shared/components/CopyClipBoard/CopyClipBoard'
import ProgressBySteps from '../../shared/components/ProgressBySteps/ProgressBySteps'
import TableActions from '../../shared/components/TableActions/TableActions'
import { TagCustomized } from '../../shared/components/TagCustomized/TagCustomized'
import { currencyFormat, numberWithSpaces } from '../../shared/utils/helpers'
import { useDeleteIncomeMutation } from './supabaseApi/incomesApi'

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

function getIncomesColumns(handleViewDetailsDashboard) {
  const [deleteIncome] = useDeleteIncomeMutation({})

  const incomesTableColumns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'h',
      width: 200,
      fixed: true,
    },
    {
      title: 'Date',
      dataIndex: 'dateCreated',
      key: 'hh',
    },
    {
      title: 'Customer Phone',
      dataIndex: 'customerPhone',
      key: 'hhh',
      align: 'center',
      render: (phoneNumber) => (
        <CopyClipBoard item={phoneNumber}>
          <a href={`tel:${phoneNumber}`}>{numberWithSpaces(phoneNumber, '## ### ###')}</a>
        </CopyClipBoard>
      ),
    },
    {
      title: 'Customer Email',
      dataIndex: 'customerEmail',
      key: 'hhhh',
      width: 250,
      render: (email) => (
        <CopyClipBoard item={email}>
          {' '}
          <a href={`mailto:${email}`}>{email}</a>
        </CopyClipBoard>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'a',
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
      title: 'Price',
      dataIndex: 'price',
      key: 'aa',
      render: (price) => currencyFormat(price),
    },
    {
      title: 'Slices Paid',
      dataIndex: 'slicesPrecentage',
      key: 'aaa',
      render: (infoSlices) => <ProgressBySteps slicesInfo={infoSlices} />,
    },
    {
      title: 'Training',
      dataIndex: 'trainingName',
      key: 'aaaa',
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
      key: 'q',
      render: (location) => (
        <TagCustomized colors={locationColors[location.replaceAll(' ', '').toLowerCase()] || {}}>
          {location}
        </TagCustomized>
      ),
    },
    {
      title: 'Employee Name ',
      dataIndex: 'employeeName',
      key: 'qq',
    },
    {
      title: 'Description ',
      dataIndex: 'description',
      key: 'qqq',
    },
    {
      title: 'Actions',
      key: 'qqqa',
      dataIndex: 'key',
      render: (key) => <TableActions id={key} where="incomes" deleteAction={deleteIncome} />,
      fixed: 'right',
      width: 100,
    },
  ]

  const icnomesTableColumnsDashboard: TableProps<DataType>['columns'] = [
    {
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      dataIndex: 'training',
      key: 'training',
      render: (text) => (
        <TagCustomized colors={trainingColors[text.replaceAll(' ', '').toLowerCase()] || {}}>
          {text}
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
      dataIndex: 'slicesPrecentage',
      key: 8,
      render: (infoSlices) => <ProgressBySteps slicesInfo={infoSlices} />,
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

  return { incomesTableColumns, icnomesTableColumnsDashboard }
}

export { getIncomesColumns }
