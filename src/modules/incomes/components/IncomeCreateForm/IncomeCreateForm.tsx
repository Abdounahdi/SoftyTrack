import { Spin } from 'antd'
import { useGetTrainingsQuery } from '../../data/supabaseApi/trainingsApi'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'
import { useForm } from 'react-hook-form'

export default function IncomeCreateForm() {
  const { data: trainings, isLoading } = useGetTrainingsQuery({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  function onSumbit(newObj) {
    console.log(newObj)
    // const newCustomer = {
    //   name: newObj.name,
    //   phone: newObj.phone,
    //   email: newObj.email,
    // }
    // const newIncome = {}
    // console.log(newCustomer)
  }

  function onError(error) {
    console.log(error)
  }

  if (isLoading) return <Spin size="large" />
  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSumbit, onError)}>
      <div className="create_form_container">
        <CustomerForm trainings={trainings} register={register} control={control} errors={errors} />
        <PaymentForm register={register} control={control} errors={errors} />
        <button className="sumbit_button_create_income">Create Income</button>
      </div>
    </form>
  )
}
