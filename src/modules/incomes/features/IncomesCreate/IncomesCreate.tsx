import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import IncomeCreateForm from '../../components/IncomeCreateForm/IncomeCreateForm'

export default function IncomesCreateForm() {
  return (
    <div className="incomes_create_form_container">
      <PageHeading title="Create Incomes" goBack={true} />
      <IncomeCreateForm />
    </div>
  )
}
