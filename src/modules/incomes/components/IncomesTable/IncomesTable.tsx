import { useState } from 'react'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import { Pagination, PaginationProps, Spin, Table } from 'antd'

import { useGetIncomesQuery } from '../../data/supabaseApi/incomesApi'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { setCurrentPage, setPageSize } from '../../data/incomesUiSlice'

import { incomesTableColumns } from '../../data/TableColumnsObject'
import ColumnsShowOptions from '../../../shared/components/ColumnsShowOptions/ColumnsShowOptions'

const itemRender: PaginationProps['itemRender'] = (_, item, originalElement) => {
  return item === 'prev' ? (
    <p className="pagination_text">
      {' '}
      <HiArrowLongLeft />
      <span>Previous</span>
    </p>
  ) : item === 'next' ? (
    <p className="pagination_text">
      {' '}
      <HiArrowLongRight />
      <span>Next</span>
    </p>
  ) : (
    originalElement
  )
}

export default function IncomesTable() {
  const dispatch = useAppDispatch()
  const { showColumnsOptions, checkedListOfShownColumns } = useAppSelector(
    (state) => state.incomesUi
  )
  const { currentPage, pageSize } = useAppSelector((state) => state.incomesUi)

  const [selectedRows, setSelectedRows] = useState([])

  const { data, isFetching } = useGetIncomesQuery({
    currentPage,
    pageSize,
  })

  if (isFetching) return <Spin size="large" />

  const totalIncomes = data?.count

  const incomes = data?.incomesInfo.map((income) => {
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

  return (
    <>
      {showColumnsOptions ? (
        <ColumnsShowOptions checkedList={checkedList} columns={incomesTableColumns} />
      ) : (
        ''
      )}

      <div className="table_incomes_container">
        <div className="">
          <Table
            className="table_incomes"
            pagination={false}
            dataSource={incomes}
            columns={newColumns}
            rowSelection={{
              type: 'checkbox',
              fixed: true,
              ...rowSelection,
            }}
            scroll={{ x: 2000 }}
            loading={false}
          />
        </div>
        <Pagination
          total={totalIncomes}
          showSizeChanger
          onChange={handlePagination}
          pageSizeOptions={['5', '10', '20']}
          itemRender={itemRender}
        />
      </div>
    </>
  )
}
