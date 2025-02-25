import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import IncomesExpensesTable from '../../../shared/components/IncomesExpensesTable/IncomesExpensesTable'
import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'

export default function Incomes() {
  return (
    <PageActionLayout title="Incomes" goBack={true}>
      <TableOuterActions where="incomes" />
      <IncomesExpensesTable where="incomes" />
    </PageActionLayout>
  )
}
