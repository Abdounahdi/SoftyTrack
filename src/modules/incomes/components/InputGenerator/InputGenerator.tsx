import { DatePicker, Input, Select } from 'antd'

export default function InputGenerator({ inputOptions }) {
  const { type, placeHolder, selectOptions } = inputOptions

  const className = inputOptions.className || ''

  console.log(inputOptions)
  if (type === 'text') {
    return <Input type="text" placeholder={placeHolder} status={inputOptions.error && 'error'} />
  }

  if (type === 'tel') {
    return <Input type="tel" placeholder={placeHolder} status={inputOptions.error && 'error'} />
  }

  if (type === 'email') {
    return <Input type="email" placeholder={placeHolder} status={inputOptions.error && 'error'} />
  }

  if (type === 'number') {
    return <Input type="number" placeholder={placeHolder} status={inputOptions.error && 'error'} />
  }

  if (type === 'textarea') {
    return <textarea placeholder={placeHolder} />
  }

  if (type === 'select') {
    return (
      <Select
        showSearch
        className={'form_column '}
        placeholder={placeHolder}
        optionFilterProp="label"
        options={selectOptions}
      />
    )
  }

  if (type === 'date') {
    return <DatePicker className={'form_column'} />
  }

  return <p>{type}</p>
}
