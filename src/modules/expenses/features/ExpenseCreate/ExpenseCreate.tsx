import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import ExpenseCreateFrom from '../../components/ExpenseCreateForm/ExpenseCreateFrom'

export default function ExpenseCreate() {
  return (
    <PageActionLayout title="Create Expense" goBack={true}>
      <ExpenseCreateFrom />
    </PageActionLayout>
  )
}
