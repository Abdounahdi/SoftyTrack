import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import TrainingActions from '../../components/TrainingActions/TrainingActions'
import TrainingsTable from '../TrainingsTable/TrainingsTable'

export default function Trainings() {
  return (
    <PageActionLayout title="Trainings" goBack={true}>
      <TrainingActions/>
      <TrainingsTable />
    </PageActionLayout>
  )
}
