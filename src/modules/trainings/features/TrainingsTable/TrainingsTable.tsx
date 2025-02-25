import { Pagination, PaginationProps, Spin, Table as TableAntD } from 'antd'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import TableActions from '../../../shared/components/TableActions/TableActions'
import { useGetTrainingsQuery } from '../../data/supabase/trainingsApi'
import Table from '../../../shared/components/Table/Table'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { setCurrentPage, setPageSize } from '../../data/trainingsSlice'

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

export default function TrainingsTable() {
  const dispatch = useAppDispatch()
  const { currentPage, pageSize } = useAppSelector((state) => state.trainingsUi)
  const { data: trainingsData, isLoading: isLoadingTrainings } = useGetTrainingsQuery({
    currentPage,
    pageSize,
  })

  const data = trainingsData?.data || []

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      width: 50,
    },
    {
      title: 'Training',
      dataIndex: 'training',
      key: 'training',
      width: 250,
      align: 'left',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Intl.DateTimeFormat('en-CA').format(new Date(date)),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: () => (
        <TableActions
          deleteAction={() => console.log('action defined')}
          buttonsOptions={['update', 'delete']}
        />
      ),
    },
  ]

  const totalData = trainingsData?.count

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  }

  const handlePagination = (currentPage, pageSize) => {
    dispatch(setCurrentPage(currentPage))
    if (pageSize) {
      dispatch(setPageSize(pageSize))
    }
  }

  return (
    <div className="table_container">
      <Table
        totalData={totalData}
        handlePagination={handlePagination}
        currentPage={currentPage}
        pageSize={pageSize}
        itemRender={itemRender}
        columns={columns}
        rowSelection={rowSelection}
        xScroll={560}
        data={data}
        isLoading={isLoadingTrainings}
      />
    </div>
  )
}
