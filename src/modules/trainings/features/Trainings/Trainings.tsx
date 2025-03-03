import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import TrainingActions from '../../components/TrainingActions/TrainingActions'
import TrainingsTable from '../../components/TrainingsTable/TrainingsTable'
import TrainingCreate from '../TrainingCreate/TrainingCreate'

export default function Trainings() {
  return (
    <PageActionLayout title="Trainings" goBack={true}>
      <TrainingActions />
      <TrainingCreate />
      <TrainingsTable />
    </PageActionLayout>
  )
}
