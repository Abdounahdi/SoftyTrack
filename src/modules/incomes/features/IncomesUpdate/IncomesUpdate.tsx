import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import IncomeCreateForm from '../../components/IncomeCreateForm/IncomeCreateForm'

export default function IncomesUpdate() {
  return (
    <PageActionLayout title="Update Income">
      <IncomeCreateForm update={true} />
    </PageActionLayout>
  )
}
