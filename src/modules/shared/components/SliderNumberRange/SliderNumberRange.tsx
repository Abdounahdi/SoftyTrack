import { InputNumber, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { currencyFormat } from '../../utils/helpers'

export default function SliderNumberRange({
  className = '',
  min = 0,
  max = 100,
  getValues,
  setValue,
  defaultValue,
}) {
  const [values, setValues] = useState(getValues('by_price_range'))

  console.log(defaultValue)

  const formValue = getValues('by_price_range')

  useEffect(() => {
    if (formValue) {
      setValues(formValue)
    }
  }, [formValue])

  useEffect(() => {
    if (defaultValue) {
      setValue('by_price_range', defaultValue)
      setValues(defaultValue)
    } else {
      setValues({ min, max })
      setValue('by_price_range', { min, max })
    }
  },[defaultValue])

  const handleChangeMin = (e) => {
    setValues((state) => {
      setValue('by_price_range', { min: e, max: state.max })
      return { min: e, max: state.max }
    })
  }

  const handleChangeMax = (e) => {
    setValues((state) => {
      setValue('by_price_range', { max: e, min: state.min })
      return { max: e, min: state.min }
    })
  }

  const handleChangeSlider = (e) => {
    setValues((state) => {
      setValue('by_price_range', { min: e.at(0), max: e.at(1) })
      return { min: e.at(0), max: e.at(1) }
    })
  }
  return (
    <div className={`${className} slider_with_number_inputs`}>
      <InputNumber
        min={0}
        max={max}
        value={values?.min}
        onChange={handleChangeMin}
        formatter={(value) => currencyFormat(value)}
        changeOnWheel
      />
      <Slider
        range
        min={min}
        max={max}
        value={[values?.min, values?.max]}
        onChange={handleChangeSlider}
        tooltip={{ open: false }}
      />
      <InputNumber
        min={0}
        max={max}
        value={values?.max}
        onChange={handleChangeMax}
        formatter={(value) => currencyFormat(value)}
        changeOnWheel
      />
    </div>
  )
}
