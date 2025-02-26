import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import ExpenseCreateFrom from '../../components/ExpenseCreateForm/ExpenseCreateFrom'

export default function ExpenseUpdate() {
  return (
    <PageActionLayout title={`Update Expense`} goBack={true}>
      <ExpenseCreateFrom update={true} />
    </PageActionLayout>
  )
}
