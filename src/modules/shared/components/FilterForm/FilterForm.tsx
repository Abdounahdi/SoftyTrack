// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useForm } from 'react-hook-form'
import FormGenerator from '../FormGenerator/FormGenerator'
import { useAppDispatch } from '../../store'

export default function FilterForm({ setFilter, filterOptions, sliderMin = 0, sliderMax = 5324 }) {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm()

  const onSuccess = (newObj) => {
    console.log(newObj)
    dispatch(setFilter(newObj))
  }

  const onError = (error) => {
    console.error(error)
  }

  const onReset = () => {
    reset()
    setValue('by_training', '')
    setValue('by_category', '')
    dispatch(setFilter([]))
    setValue('by_price_range', { min: sliderMax, max: sliderMin })
    setValue('by_date_range', '')
  }

  return (
    <form onSubmit={handleSubmit(onSuccess, onError)} className="filter_form">
      <FormGenerator
        options={filterOptions}
        register={register}
        control={control}
        disableAll={false}
        setValue={setValue}
        getValues={getValues}
      />
      <div className="buttons_box_filter_form">
        <button className="filter_form_btn">
          <span>Sumbit</span>
        </button>
        <button type="reset" className="filter_form_btn reset_form_btn" onClick={onReset}>
          <span>Reset</span>
        </button>
      </div>
    </form>
  )
}
