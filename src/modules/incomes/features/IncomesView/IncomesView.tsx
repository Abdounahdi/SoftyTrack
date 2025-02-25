import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import IncomeCreateForm from '../../components/IncomeCreateForm/IncomeCreateForm'

export default function IncomesUpdate() {
  return (
    <PageActionLayout title="View Income">
      <IncomeCreateForm update={true} disabled={true} />
    </PageActionLayout>
  )
}
