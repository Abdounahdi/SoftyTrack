// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useDeleteCategoriesMutation } from '../../data/supabase/categoriesApi'
import { setCreateFormIsOpen, setSearchQuery, setSelectedRows } from '../../data/categoriesSlice'
import { useAppDispatch, useAppSelector } from '../../../shared/store'

import { TableOuterActions } from '../../../shared/components/TableOuterActions/TableOuterActions'


export default function CategoriesActions() {
  const dispatch = useAppDispatch()
  const [deleteCategory] = useDeleteCategoriesMutation({})
  const { selectedRows, searchQuery } = useAppSelector((state) => state.categoriesUi)
  const resetSelectedRows = setSelectedRows
  const openCloseShowColumns = () => {
    console.log('no columns to be hided')
  }
  const createAction = () => {
    dispatch(setCreateFormIsOpen())
  }
  const actionsOptions = { left: ['search', 'delete'], right: ['create'] }
  return (
    <TableOuterActions
      deleteAction={deleteCategory}
      resetSelectedRows={resetSelectedRows}
      handleShowColumns={openCloseShowColumns}
      selectedRows={selectedRows}
      actionsOptions={actionsOptions}
      createAction={createAction}
      where={'Categories'}
      onSearch={setSearchQuery}
    />
  )
}
