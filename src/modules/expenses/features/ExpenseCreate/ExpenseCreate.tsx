import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import ExpenseCreateFrom from '../../components/ExpenseCreateForm/ExpenseCreateFrom'

export default function ExpenseCreate() {
  return (
    <div className="expenses_create_form_container">
      <PageHeading title="Create Expense" goBack={true} />
      <ExpenseCreateFrom />
    </div>
  )
}
