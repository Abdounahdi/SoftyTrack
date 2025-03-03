import { DatePicker, Input, Rate, Select, Slider } from 'antd'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useAppSelector } from '../../store'
import { CheckCircleOutlined } from '@ant-design/icons'
import sliceSvg from '../../assets/icons/slice.svg'
import SliderNumberRange from '../SliderNumberRange/SliderNumberRange'

export default function InputGenerator({
  inputOptions,
  control,
  register,
  disableAll,
  getValues,
  setValue,
}) {
  const {
    type,
    placeHolder,
    selectOptions,
    name,
    value,
    defaultValue = '',
    rules = {},
    sliderMin,
    sliderMax,
    onChange,
  } = inputOptions

  const { RangePicker } = DatePicker

  if (type === 'text') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: 'This field is required',
          ...rules,
          validate: (value) => (value.trim() ? true : 'This filed is required'),
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="text"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
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
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="number"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
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
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="email"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
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
        rules={{ required: 'This field is required', ...rules }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="number"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
          />
        )}
      />
    )
  }

  if (type === 'textarea') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: 'This field is required',
          ...rules,
          validate: (value) => (value.trim() ? true : 'This filed is required'),
        }}
        render={({ field, fieldState: { error } }) => (
          <Input.TextArea
            {...field}
            type="number"
            placeholder={placeHolder}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
          />
        )}
      />
    )
  }

  if (type === 'select') {
    console.log(selectOptions)
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        // rules={{ required: 'This field is required', ...rules }}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            placeholder={placeHolder}
            showSearch
            className="form_column"
            optionFilterProp="label"
            options={selectOptions}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
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
        rules={{ required: 'This Field is required', ...rules }}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            className={'form_column'}
            status={inputOptions.error && 'error'}
            disabled={disableAll}
          />
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
        rules={{ required: 'This Field is required', ...rules }}
        render={({ field, fieldState: { error } }) => (
          <Input.Password
            {...field}
            className={'password_input'}
            status={inputOptions.error && 'error'}
            placeholder={placeHolder}
            disabled={disableAll}
          />
        )}
      />
    )
  }

  if (type === 'rate') {
    const { slicesNumber } = useAppSelector((state) => state.incomesUi)
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: 'This Field is required', ...rules }}
        render={({ field, fieldState: { error } }) => {
          console.log(slicesNumber)
          return (
            <>
              <Rate
                {...field}
                count={slicesNumber > 0 ? slicesNumber : 0}
                character={<div className="slice_div"></div>}
              />
            </>
          )
        }}
      />
    )
  }

  if (type === 'slider') {
    return (
      <SliderNumberRange
        setValue={setValue}
        getValues={getValues}
        min={sliderMin}
        max={sliderMax}
        defaultValue={defaultValue}
      />
    )
  }

  if (type == 'date-range') {
    return (
      <Controller
        name={name || value}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => {
          return <RangePicker {...field} />
        }}
      />
    )
  }

  return <p>unknown type : {type}</p>
}
