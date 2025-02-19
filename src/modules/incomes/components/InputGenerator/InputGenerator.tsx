import { DatePicker, Input, Select } from 'antd'

export default function InputGenerator({ inputOptions }) {
  const { type, placeHolder, selectOptions } = inputOptions

  const className = inputOptions.className || ''

  console.log(inputOptions)
  if (type === 'text') {
    return (
      <Input
        type="text"
        placeholder={placeHolder}
        status={inputOptions.error && 'error'}
        className={className}
      />
    )
  }

  if (type === 'tel') {
    return (
      <Input
        type="tel"
        placeholder={placeHolder}
        status={inputOptions.error && 'error'}
        className={className}
      />
    )
  }

  if (type === 'email') {
    return (
      <Input
        type="email"
        placeholder={placeHolder}
        status={inputOptions.error && 'error'}
        className={className}
      />
    )
  }

  if (type === 'number') {
    return (
      <Input
        type="number"
        placeholder={placeHolder}
        status={inputOptions.error && 'error'}
        className={className}
      />
    )
  }

  if (type === 'textarea') {
    return <textarea placeholder={placeHolder} className={className} />
  }

  if (type === 'select') {
    return (
      <Select
        showSearch
        className={`form_column ${className}`}
        placeholder={placeHolder}
        optionFilterProp="label"
        options={selectOptions}
      />
    )
  }

  if (type === 'date') {
    return <DatePicker className={`form_column ${className}`} />
  }

  return <p>{type}</p>
}
