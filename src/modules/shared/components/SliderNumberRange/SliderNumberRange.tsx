import { InputNumber, Slider } from 'antd'
import { useEffect, useState } from 'react'
import { currencyFormat } from '../../utils/helpers'

export default function SliderNumberRange({
  className = '',
  min = 0,
  max = 100,
  getValues,
  setValue,
}) {
  const [values, setValues] = useState(getValues('price-range'))

  useEffect(() => {
    setValues({ min, max })
    setValue('price-range', { min, max })
  }, [])

  const handleChangeMin = (e) => {
    console.log(e)
    setValues((state) => {
      setValue('price-range', { min: e, max: state.max })
      return { min: e, max: state.max }
    })
  }
  const handleChangeMax = (e) => {
    setValues((state) => {
      setValue('price-range', { max: e, min: state.min })
      return { max: e, min: state.min }
    })
  }

  const handleChangeSlider = (e) => {
    setValues((state) => {
      setValue('price-range', { min: e.at(0), max: e.at(1) })
      return { min: e.at(0), max: e.at(1) }
    })
  }
  console.log(values)
  return (
    <div className={`${className} slider_with_number_inputs`}>
      <InputNumber
        min={0}
        max={max}
        value={values?.min}
        onChange={handleChangeMin}
        formatter={(value) => currencyFormat(value)}
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
      />
    </div>
  )
}
