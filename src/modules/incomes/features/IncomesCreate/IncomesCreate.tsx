import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import IncomeCreateForm from '../../components/IncomeCreateForm/IncomeCreateForm'

export default function IncomesCreateForm() {
  return (
    <PageActionLayout title="Create new Income">
      <IncomeCreateForm />
    </PageActionLayout>
  )
}
