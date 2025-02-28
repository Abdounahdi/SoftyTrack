import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useCreateIncomeMutation, useUpdateIncomeMutation } from '../../data/supabaseApi/incomesApi'
import toast from 'react-hot-toast'
import { getIncomesFormData } from '../../data/incomesTableData'
import FormCreateUpdateBtn from '../../../shared/components/FormCreateUpdateBtn/FormCreateUpdateBtn'
import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import { useEffect } from 'react'
import { useAppDispatch } from '../../../shared/store'
import { setSlicesNumber } from '../../data/incomesUiSlice'

export default function IncomeCreateForm({ update = false, disabled = false }) {
  const [createIncome, { isLoading: isCreating }] = useCreateIncomeMutation({})
  const [updateIncome, { isLoading: isUpdating }] = useUpdateIncomeMutation({})

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm()

  const { isLoading, customerFormInputs, paymentFormInputs, navigate, incomeId, customerId } =
    getIncomesFormData(errors, update)

  async function onSumbit(newObj) {
    const { data } = update
      ? await updateIncome({ id: incomeId, updatedIncome: newObj, customerId: customerId })
      : await createIncome(newObj)
    if (!data?.error) {
      navigate('/incomes')
      toast.success(update ? `Income updated ! ` : `New Income Created !`)
    } else {
      toast.error(update ? `Income was not Updated !` : `Income was not created !`)
    }
  }

  const totalSlices = watch('total_slices')

  useEffect(() => {
    if (totalSlices) {
      dispatch(setSlicesNumber(Number(totalSlices)))
    } else {
      dispatch(setSlicesNumber(0))
    }
  }, [totalSlices])

  function onError(error) {
    console.log(error)
  }

  if (isLoading) return <Spin size="large" />

  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSumbit, onError)}>
      <div className="create_form_container">
        <div className="create_form_box">
          <FormGenerator
            options={customerFormInputs}
            register={register}
            control={control}
            disableAll={disabled}
          />
          <FormGenerator
            options={paymentFormInputs}
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
      </div>
    </form>
  )
}
