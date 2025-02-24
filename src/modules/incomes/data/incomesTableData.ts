import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/store'
import { useGetIncomesQuery } from './supabaseApi/incomesApi'
import { incomesTableColumns } from './IncomesTableColumns'
import { setCurrentPage, setPageSize } from './incomesUiSlice'

export default function incomesTableData() {
  const dispatch = useAppDispatch()
  const { showColumnsOptions, checkedListOfShownColumns } = useAppSelector(
    (state) => state.incomesUi
  )
  const { currentPage, pageSize } = useAppSelector((state) => state.incomesUi)

  const { data: incomes, isFetching } = useGetIncomesQuery({
    currentPage,
    pageSize,
  })

  const [selectedRows, setSelectedRows] = useState([])

  const totalData = incomes?.count

  const data = incomes?.incomesInfo.map((income) => {
    return {
      dateCreated: new Intl.DateTimeFormat('en-CA').format(new Date(income.date_created)),
      customerName: income.customer_id.full_name,
      customerPhone: income.customer_id.phone,
      customerEmail: income.customer_id.email,
      paymentMethod: income.payment_method_id.payment_method,
      slicesTotalCount: income.total_slices,
      sliceCount: income.paid_slices,
      slicesPrecentage: ` ${income.total_slices}-${income.paid_slices} `,
      location: income.reception_location_id.location,
      description: income.description,
      trainingName: income.training_id.training,
      employeeName: income.made_by.full_name,
      price: income.price,
      key: income.id,
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
      ? incomesTableColumns.map((item) => item.key)
      : checkedListOfShownColumns

  const newColumns = incomesTableColumns.map((item) => ({
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
