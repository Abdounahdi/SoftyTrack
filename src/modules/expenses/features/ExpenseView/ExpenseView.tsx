import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import ExpenseCreateFrom from '../../components/ExpenseCreateForm/ExpenseCreateFrom'

export default function ExpenseUpdate() {
  return (
    <PageActionLayout title={`View Expense`} goBack={true}>
      <ExpenseCreateFrom update={true} disabled={true} />
    </PageActionLayout>
  )
}
