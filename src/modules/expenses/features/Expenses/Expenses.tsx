import IncomesExpensesTable from '../../../shared/components/IncomesExpensesTable/IncomesExpensesTable'
import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'

export default function Expenses() {
  return (
    <div className="incomes_expenses_page_layout">
      <PageHeading title="Expenses" goBack={true} />
      <TableOuterActions where="expenses" />
      <IncomesExpensesTable where="expenses" />
    </div>
  )
}
