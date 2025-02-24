import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import toast from 'react-hot-toast'

import { useCreateExpenseMutation } from '../../data/supabaseApi/expensesApi'
import { getExpensesFromOptions } from '../../data/expensesTableData'

import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import { useNavigate } from 'react-router'

export default function ExpenseCreateFrom({ update = false }) {
  const navigate = useNavigate()
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { isLoading, expenseFormOptions } = getExpensesFromOptions(errors, update)

  async function onSuccess(newObj) {
    // const newExpense = await createExpense(newObj)
    if (newExpense) {
      navigate('/expenses')
      toast.success('New expense created !')
    } else {
      toast.error('Expense not created !')
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
          <FormGenerator options={expenseFormOptions} control={control} register={register} />
        </div>
        <button className="sumbit_button_create_expense" disabled={false}>
          {isCreating ? 'Creating Expense ... ' : 'Create Expense'}
        </button>
      </div>
    </form>
  )
}
