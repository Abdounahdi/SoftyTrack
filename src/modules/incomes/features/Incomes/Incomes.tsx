import IncomesExpensesTable from '../../../shared/components/IncomesExpensesTable/IncomesExpensesTable'
import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import IncomesTableActions from '../../components/IncomesTableActions/IncomesTableActions'

export default function Incomes() {
  return (
    <PageActionLayout title="Incomes" goBack={true}>
      <IncomesTableActions/>
      <IncomesExpensesTable where="incomes" />
    </PageActionLayout>
  )
}
