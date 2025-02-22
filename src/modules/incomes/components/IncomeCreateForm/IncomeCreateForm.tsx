import { Spin } from 'antd'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'
import { useForm } from 'react-hook-form'
import { useCreateIncomeMutation , useGetPaymentMethodsQuery, useGetLocationsQuery , useGetTrainingsQuery} from '../../data/supabaseApi/incomesApi'
import { useGetAllUsersQuery } from '../../data/supabaseApi/usersApi'
// import { useGetLocationsQuery } from '../../data/supabaseApi/locationsApi'
// import { useGetPaymentMethodsQuery } from '../../data/supabaseApi/paymentMethodsApi'

export default function IncomeCreateForm() {
  const { data: trainings, isLoading: isLoadingTrainings } = useGetTrainingsQuery({})
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({})
  const { data: locations, isLoading: isLoadingLocations } = useGetLocationsQuery({})
  const { data: payment_methods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethodsQuery(
    {}
  )
  const [createIncome, data] = useCreateIncomeMutation({})

  const isLoading =
    isLoadingTrainings || isLoadingUsers || isLoadingLocations || isLoadingPaymentMethods

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  function onSumbit(newObj) {
    // console.log(newObj)
    createIncome(newObj)
    console.log(data)
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
        <PaymentForm
          payment_methods={payment_methods}
          locations={locations}
          users={users}
          register={register}
          control={control}
          errors={errors}
        />
        <button className="sumbit_button_create_income">Create Income</button>
      </div>
    </form>
  )
}
