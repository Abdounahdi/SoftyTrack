import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import IncomesExpensesTable from '../../../shared/components/IncomesExpensesTable/IncomesExpensesTable'

export default function Incomes() {
  return (
    <div className="incomes_expenses_page_layout">
      <PageHeading title="Incomes" goBack={true} />
      <TableOuterActions where="incomes" />
      <IncomesExpensesTable where="incomes" />
    </div>
  )
}
