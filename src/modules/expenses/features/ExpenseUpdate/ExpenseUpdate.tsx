import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import ExpenseCreateFrom from '../../components/ExpenseCreateForm/ExpenseCreateFrom'

export default function ExpenseUpdate() {
  return (
    <div className="expenses_create_form_container">
      <PageHeading title={`Update Expense`} goBack={true} />
      <ExpenseCreateFrom update={true} />
    </div>
  )
}
