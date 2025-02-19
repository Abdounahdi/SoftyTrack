import { Spin } from 'antd'
import { useGetTrainingsQuery } from '../../data/supabaseApi/trainingsApi'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'
import { useForm } from 'react-hook-form'
import FormGenerator from '../FormGenerator/FormGenerator'

export default function IncomeCreateForm() {
  const { data: trainings, isLoading } = useGetTrainingsQuery({})

  const { register, handleSubmit, formState, control } = useForm()

  function onSumbit(newObj) {
    console.log(newObj)
    const newCustomer = {
      name: newObj.name,
      phone: newObj.phone,
      email: newObj.email,
    }
    const newIncome = {}
    console.log(newCustomer)
  }

  function onError(error) {
    console.log(error)
  }

  const formOptions = [
    {
      columns: [
        {
          label: 'Full Name',
          type: 'text',
          value: 'customer_name',
          placeHolder: 'customer full name ... ',
          error: 'This Field is required',
        },
        {
          label: 'Phone Number',
          type: 'tel',
          value: 'phone',
          placeHolder: '** *** ***',
          error: '',
        },
        {
          label: 'Email',
          type: 'email',
          value: 'email',
          placeHolder: 'customer@example.com',
          error: '',
        },
        {
          label: 'Training Chosen',
          type: 'select',
          selectOptions: [],
          name: 'training',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: '',
        },
      ],
    },
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: 'This Field is required',
        },
        {
          label: 'Total Slices',
          type: 'number',
          value: 'total_slices',
          placeHolder: '',
          error: '',
          className: 'slices_box_width_small',
        },
        {
          label: 'Training Chosen',
          type: 'select',
          selectOptions: [],
          name: 'training',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: '',
        },
      ],
    },
  ]

  if (isLoading) return <Spin size="large" />
  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSumbit, onError)}>
      <div className="create_form_container">
        <CustomerForm trainings={trainings} register={register} control={control} />
        <PaymentForm register={register} control={control} />
        <FormGenerator options={formOptions} />
        <button className="sumbit_button_create_income">Create Income</button>
      </div>
    </form>
  )
}
