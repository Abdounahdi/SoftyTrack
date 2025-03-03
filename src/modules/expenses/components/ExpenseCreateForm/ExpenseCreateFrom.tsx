// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from '../../data/supabaseApi/expensesApi'
import { getExpensesFromOptions } from '../../data/expensesTableData'

import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import FormCreateUpdateBtn from '../../../shared/components/FormCreateUpdateBtn/FormCreateUpdateBtn'

export default function ExpenseCreateFrom({ update = false, disabled = false }) {
  const navigate = useNavigate()
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation()
  const [updateExpense, { isLoading: isUpdating }] = useUpdateExpenseMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { isLoading, expenseFormOptions, expenseId } = getExpensesFromOptions(errors, update)

  async function onSuccess(newObj) {
    const newExpense = update
      ? await updateExpense({ updatedExpense: newObj, id: expenseId })
      : await createExpense(newObj)
    if (newExpense) {
      navigate('/expenses')
      if (update) {
        toast.success('Expense updated !')
      } else {
        toast.success('New expense created !')
      }
    } else {
      if (update) {
        toast.error('Expense was not updated !')
      } else {
        toast.error('Expense was not created !')
      }
    }
  }

  function onError(err) {
    console.log('hi error')
    console.error(err)
  }

  if (isLoading) return <Spin />

  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSuccess, onError)}>
      <div className="create_form_container">
        <div className="create_form_box">
          <FormGenerator
            options={expenseFormOptions}
            control={control}
            register={register}
            disableAll={disabled}
          />
        </div>
        {disabled ? (
          ''
        ) : (
          <FormCreateUpdateBtn
            type="expense"
            isCreating={isCreating}
            isUpdating={isUpdating}
            update={update}
          />
        )}
      </div>
    </form>
  )
}
