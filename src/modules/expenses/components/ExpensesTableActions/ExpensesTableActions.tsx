import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import {
  setSelectedRows,
  setShowColumnsOptionsExpenses,
  setShowFilterOptions,
} from '../../data/expensesUiSlice'
import { useDeleteExpenseMutation } from '../../data/supabaseApi/expensesApi'

export default function ExpensesTableActions() {
  const dispatch = useAppDispatch()
  const [deleteExpense] = useDeleteExpenseMutation({})
  const { showColumnsOptions, selectedRows } = useAppSelector((state) => state.expensesUi)
  const resetSelectedRows = setSelectedRows
  const openCloseShowColumns = () => {
    dispatch(setShowColumnsOptionsExpenses())
  }
  const handleFilterOptionsShow = () => {
    dispatch(setShowFilterOptions())
  }

  const actionsOptions = { left: ['filter', 'delete'], right: ['showColumns', 'create'] }
  return (
    <TableOuterActions
      deleteAction={deleteExpense}
      resetSelectedRows={resetSelectedRows}
      handleShowColumns={openCloseShowColumns}
      showColumnsOptions={showColumnsOptions}
      selectedRows={selectedRows}
      actionsOptions={actionsOptions}
      handleFilterOptionsShow={handleFilterOptionsShow}
      where="expenses"
    />
  )
}
