import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import TrainingsTable from '../TrainingsTable/TrainingsTable'

export default function Trainings() {
  return (
    <PageActionLayout title="Trainings" goBack={true}>
      <TrainingsTable />
    </PageActionLayout>
  )
}
