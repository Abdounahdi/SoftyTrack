import IncomesExpensesTable from '../../../shared/components/IncomesExpensesTable/IncomesExpensesTable'
import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import ExpensesTableActions from '../../components/ExpensesTableActions/ExpensesTableActions'

export default function Expenses() {
  return (
    <div className="incomes_expenses_page_layout">
      <PageHeading title="Expenses" goBack={true} />
      <ExpensesTableActions/>
      <IncomesExpensesTable where="expenses" />
    </div>
  )
}
