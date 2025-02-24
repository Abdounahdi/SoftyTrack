import CopyClipBoard from '../../shared/components/CopyClipBoard/CopyClipBoard'
import ProgressBySteps from '../../shared/components/ProgressBySteps/ProgressBySteps'
import TableActions from '../../shared/components/TableActions/TableActions'
import { TagCustomized } from '../../shared/components/TagCustomized/TagCustomized'
import { currencyFormat, numberWithSpaces } from '../../shared/utils/helpers'

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

const incomesTableColumns = [
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
      <CopyClipBoard item={phoneNumber}>
        <a href={`tel:${phoneNumber}`}>{numberWithSpaces(phoneNumber, '## ### ###')}</a>
      </CopyClipBoard>
    ),
  },
  {
    title: 'Customer Email',
    dataIndex: 'customerEmail',
    key: 4,
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
    title: 'Price',
    dataIndex: 'price',
    key: 6,
    render: (price) => currencyFormat(price),
  },
  {
    title: 'Slices Paid',
    dataIndex: 'slicesPrecentage',
    key: 8,
    render: (infoSlices) => <ProgressBySteps slicesInfo={infoSlices} />,
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
    dataIndex: 'key',
    render: (key) => <TableActions id={key} />,
    fixed: 'right',
    width: 100,
  },
]

export { incomesTableColumns }
