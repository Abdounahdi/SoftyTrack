import { Spin } from 'antd'
import { useGetTrainingsQuery } from '../../data/supabaseApi/trainingsApi'
import CustomerForm from '../CustomerForm/CustomerForm'
import PaymentForm from '../PaymentForm/PaymentForm'

export default function IncomeCreateForm() {
  const { data: trainings, isLoading } = useGetTrainingsQuery({})

  if (isLoading) return <Spin size="large" />
  return (
    <form className="customer_create_form">
      <div className="create_form_container">
        <CustomerForm trainings={trainings} />
        <PaymentForm trainings={trainings} />
      </div>
    </form>
  )
}
