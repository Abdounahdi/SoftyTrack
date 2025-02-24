import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/store'
import { useGetExpensesQuery } from './supabaseApi/expensesApi'
import { expensesTableColumns } from './TableColumnsExpenses'
import { setPageSize , setCurrentPage} from './expensesUiSlice'

export default function expensesTableData() {
  const dispatch = useAppDispatch()
  const { showColumnsOptions, checkedListOfShownColumns } = useAppSelector(
    (state) => state.expensesUi
  )
  const { currentPage, pageSize } = useAppSelector((state) => state.expensesUi)

  const { data: expenses, isFetching } = useGetExpensesQuery({
    currentPage: 1,
    pageSize: 2,
  })

  const [selectedRows, setSelectedRows] = useState([])

  const totalData = expenses?.count

  const data = expenses?.expensesInfo.map((expense) => {
    return {
      dateCreated: new Intl.DateTimeFormat('en-CA').format(new Date(expense.date_created)),
      employeeName: expense.user_id.full_name,
      price: expense.price,
      description: expense.description,
      category: expense.category_id.category,
      paymentMethod: expense.payment_method_id.payment_method,
    }
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  const checkedList =
    checkedListOfShownColumns.length === 0
      ? expensesTableColumns.map((item) => item.key)
      : checkedListOfShownColumns

  const newColumns = expensesTableColumns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key),
  }))

  const handlePagination = (currentPage, pageSize) => {
    dispatch(setCurrentPage(currentPage))
    if (pageSize) {
      dispatch(setPageSize(pageSize))
    }
  }

  return {
    isFetching,
    data,
    pageSize,
    currentPage,
    showColumnsOptions,
    checkedListOfShownColumns,
    selectedRows,
    totalData,
    rowSelection,
    checkedList,
    handlePagination,
    newColumns,
  }
}
