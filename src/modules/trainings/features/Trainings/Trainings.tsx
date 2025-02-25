import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import TrainingsTable from '../TrainingsTable/TrainingsTable'

export default function Trainings() {
  return (
    <PageActionLayout title="Trainings" goBack={true}>
      <TableOuterActions/>
      <TrainingsTable />
    </PageActionLayout>
  )
}
