import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import {  useAppSelector } from '../../../shared/store'
import { useDeleteTrainingMutation } from '../../data/supabase/trainingsApi'
import { setSelectedRows } from '../../data/trainingsSlice'

export default function TrainingActions() {
  const [deleteTraining] = useDeleteTrainingMutation({})
  const { showColumnsOptions, selectedRows } = useAppSelector((state) => state.trainingsUi)
  const resetSelectedRows = setSelectedRows
  const openCloseShowColumns = () => {
    console.log("no columns to be hided")
  }
  const actionsOptions = { left: ['filter', 'delete'], right: ['create'] }
  return (
    <TableOuterActions
      deleteAction={deleteTraining}
      resetSelectedRows={resetSelectedRows}
      handleShowColumns={openCloseShowColumns}
      showColumnsOptions={showColumnsOptions}
      selectedRows={selectedRows}
      actionsOptions={actionsOptions}
    />
  )
}
