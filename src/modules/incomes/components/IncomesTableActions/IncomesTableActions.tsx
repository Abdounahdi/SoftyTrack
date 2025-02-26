import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { setSelectedRows, setShowColumnsOptionsIncomes } from '../../data/incomesUiSlice'
import { useDeleteIncomeMutation } from '../../data/supabaseApi/incomesApi'

export default function IncomesTableActions() {
  const dispatch = useAppDispatch()
  const [deleteIncome] = useDeleteIncomeMutation({})
  const { showColumnsOptions, selectedRows } = useAppSelector((state) => state.incomesUi)
  const resetSelectedRows = setSelectedRows
  const openCloseShowColumns = () => {
    dispatch(setShowColumnsOptionsIncomes())
  }
  const actionsOptions = { left: ['filter', 'delete'], right: ['showColumns', 'create'] }
  return (
    <TableOuterActions
      deleteAction={deleteIncome}
      resetSelectedRows={resetSelectedRows}
      handleShowColumns={openCloseShowColumns}
      showColumnsOptions={showColumnsOptions}
      selectedRows={selectedRows}
      actionsOptions={actionsOptions}
    />
  )
}
