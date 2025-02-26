import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'
import { useCreateIncomeMutation, useUpdateIncomeMutation } from '../../data/supabaseApi/incomesApi'
import toast from 'react-hot-toast'
import { getIncomesFormData } from '../../data/incomesTableData'
import FormCreateUpdateBtn from '../../../shared/components/FormCreateUpdateBtn/FormCreateUpdateBtn'

export default function IncomeCreateForm({ update = false, disabled = false }) {
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation({})
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { isLoading, customerFormInputs, paymentFormInputs, navigate, incomeId, customerId } =
    getIncomesFormData(errors, update)

  async function onSumbit(newObj) {
    const { data } = update
      ? await updateIncome({ id: incomeId, updatedIncome: newObj, customerId: customerId })
      : await createIncome(newObj)
    if (!data?.error) {
      // navigate('/incomes')
      toast.success(update ? `Income updated ! ` : `New Income Created !`)
    } else {
      toast.error(update ? `Income was not Updated !` : `Income was not created !`)
    }
  }

  function onError(error) {
    console.log(error)
  }

  if (isLoading) return <Spin size="large" />

  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSumbit, onError)}>
      <div className="create_form_container">
        <CustomerForm
          inputs={customerFormInputs}
          register={register}
          control={control}
          disableAll={disabled}
        />
        <PaymentForm
          inputs={paymentFormInputs}
          register={register}
          control={control}
          disableAll={disabled}
        />
        {disabled ? (
          ''
        ) : (
          <FormCreateUpdateBtn
            type="income"
            isCreating={isCreating}
            isUpdating={isUpdating}
            update={update}
          />
        )}
      </div>
    </form>
  )
}
