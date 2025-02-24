import { DatePicker, Input, Select } from 'antd'
import { Controller } from 'react-hook-form'

export default function InputGenerator({ inputOptions, control, register }) {
  const { type, placeHolder, selectOptions, name, value, defaultValue = '' } = inputOptions

  if (type === 'text') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="text"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
          />
        )}
      />
    )
  }

  if (type === 'tel') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: 'This field is required',
          maxLength: { value: 8, message: 'This Phone Number is not valid' },
          minLength: { value: 8, message: 'This Phone Number is not valid ' },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="tel"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
          />
        )}
      />
    )
  }

  if (type === 'email') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: 'This field is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="email"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
          />
        )}
      />
    )
  }

  if (type === 'number') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="number"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
          />
        )}
      />
    )
  }

  if (type === 'textarea') {
    return <textarea placeholder={placeHolder} {...register(name || value)} defaultValue={defaultValue} />
  }

  if (type === 'select') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            placeholder={placeHolder}
            showSearch
            className="form_column"
            optionFilterProp="label"
            options={selectOptions}
            status={inputOptions.error && 'error'}
          />
        )}
      />
    )
  }

  if (type === 'date') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This Field is required' }}
        render={({ field, fieldState: { error } }) => (
          <DatePicker {...field} className={'form_column'} status={inputOptions.error && 'error'} />
        )}
      />
    )
  }

  if (type === 'password') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This Field is required' }}
        render={({ field, fieldState: { error } }) => (
          <Input.Password
            {...field}
            className={'password_input'}
            status={inputOptions.error && 'error'}
            placeholder={placeHolder}
          />
        )}
      />
    )
  }

  return <p>unknown type : {type}</p>
}
