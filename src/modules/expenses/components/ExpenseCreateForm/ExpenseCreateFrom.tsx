import { useForm } from 'react-hook-form'
import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import { useGetPaymentMethodsQuery } from '../../../incomes/data/supabaseApi/incomesApi'
import { Spin } from 'antd'
import { useGetAllUsersQuery } from '../../../incomes/data/supabaseApi/usersApi'
import {
  useCreateExpenseMutation,
  useGetExpenseByIdQuery,
  useGetExpensesCategoriesQuery,
} from '../../data/supabaseApi/expensesApi'
import { useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'

export default function ExpenseCreateFrom({ update = false }) {
  const { data: paymentMethodOptions, isLoading: isLoadingPaymentMethods } =
    useGetPaymentMethodsQuery({})
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery({})
  const { data: categories, isLoading: isLoadingCategories } = useGetExpensesCategoriesQuery({})
  const [createExpense, { isLoading: isCreating }] = useCreateExpenseMutation()

  const { data: expenseByIdInfo, isLoading: isLoadingExpenseById } = useGetExpenseByIdQuery({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const expenseFormOptions = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
          defaultValue: null,
        },
        {
          label: 'Payment Method',
          type: 'select',
          selectOptions: paymentMethodOptions?.map((paymentMethod) => {
            {
              return { value: paymentMethod.id, label: paymentMethod.payment_method }
            }
          }),
          name: 'payment_method_id',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.payment_method?.message,
          defaultValue: null,
        },
        {
          label: 'Category',
          type: 'select',
          selectOptions: categories?.map((category) => {
            {
              return { value: category.id, label: category.category }
            }
          }),
          value: 'category_id',
          createOption: true,
          placeHolder: 'Choose Category ... ',
          error: errors?.payment_method?.message,
          defaultValue: null,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Employee Name',
          type: 'select',
          selectOptions: users?.map((user) => {
            return { label: user.full_name, value: user.id }
          }),
          name: 'user_id',
          createOption: false,
          placeHolder: ' ',
          error: errors?.employeeName?.message,
          defaultValue: null,
        },
        {
          label: 'Date of income',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
          defaultValue: null,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Description',
          type: 'textarea',
          placeHolder: 'any details you want to add ... ',
          name: 'description',
          error: errors?.description?.message,
          defaultValue: null,
        },
      ],
    },
  ]

  async function onSuccess(newObj) {
    const newExpense = await createExpense(newObj)
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

  const isLoading =
    isLoadingPaymentMethods || isLoadingUsers || isLoadingCategories || isLoadingExpenseById

  if (isLoading) return <Spin />
  
  console.log(expenseByIdInfo)

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
