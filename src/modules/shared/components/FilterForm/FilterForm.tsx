import { useForm } from 'react-hook-form'
import FormGenerator from '../FormGenerator/FormGenerator'

export default function FilterForm({ filterOptions, sliderMin = 0, sliderMax = 5324 }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    reset,
  } = useForm()

  const options = [
    {
      label: 'Range of Date',
    },
  ]



  const onSuccess = (newObj) => {
    console.log(newObj)
  }

  const onError = (error) => {
    console.error(error)
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
        <button type="reset" className="filter_form_btn reset_form_btn" onClick={reset}>
          <span>Reset</span>
        </button>
      </div>
    </form>
  )
}
