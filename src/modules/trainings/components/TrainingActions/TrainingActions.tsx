import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useDeleteTrainingMutation } from '../../data/supabase/trainingsApi'
import { setCreateFormIsOpen, setSelectedRows } from '../../data/trainingsSlice'
import TrainingForm from '../TrainingForm/TrainingForm'

export default function TrainingActions() {
  const dispatch = useAppDispatch()
  const [deleteTraining] = useDeleteTrainingMutation({})
  const { showColumnsOptions, selectedRows } = useAppSelector((state) => state.trainingsUi)
  const resetSelectedRows = setSelectedRows
  const openCloseShowColumns = () => {
    console.log('no columns to be hided')
  }
  const createAction = () => {
    dispatch(setCreateFormIsOpen())
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
      createAction={createAction}
    />
  )
}
