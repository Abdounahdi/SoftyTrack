import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import { useAppSelector } from '../../../shared/store'
import TrainingActions from '../../components/TrainingActions/TrainingActions'
import TrainingsTable from '../../components/TrainingsTable/TrainingsTable'
import TrainingCreate from '../TrainingCreate/TrainingCreate'

export default function Trainings() {
  const { createFormIsOpen } = useAppSelector((state) => state.trainingsUi)
  return (
    <PageActionLayout title="Trainings" goBack={true}>
      <TrainingActions />
      <TrainingCreate />
      <TrainingsTable />
    </PageActionLayout>
  )
}
