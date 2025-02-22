import { Spin } from 'antd'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'
import { useForm } from 'react-hook-form'
import {
  useCreateIncomeMutation,
  useGetPaymentMethodsQuery,
  useGetLocationsQuery,
  useGetTrainingsQuery,
} from '../../data/supabaseApi/incomesApi'
import { useGetAllUsersQuery } from '../../data/supabaseApi/usersApi'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

export default function IncomeCreateForm() {
  const { data: trainings, isLoading: isLoadingTrainings } = useGetTrainingsQuery({})
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({})
  const { data: locations, isLoading: isLoadingLocations } = useGetLocationsQuery({})
  const { data: payment_methods, isLoading: isLoadingPaymentMethods } = useGetPaymentMethodsQuery(
    {}
  )
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation({})
  const navigate = useNavigate()

  const isLoading =
    isLoadingTrainings || isLoadingUsers || isLoadingLocations || isLoadingPaymentMethods

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  async function onSumbit(newObj) {
    await createIncome(newObj)
    navigate('/incomes')
    toast.success('New Income Created !')
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
        <button className="sumbit_button_create_income" disabled={isCreating}>
          {isCreating ? 'Creating Income ... ' : 'Create Income'}
        </button>
      </div>
    </form>
  )
}
