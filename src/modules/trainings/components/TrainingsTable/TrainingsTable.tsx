// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { Pagination, PaginationProps, Spin, Table as TableAntD } from 'antd'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import {
  useDeleteTrainingMutation,
  useGetTrainingsQuery,
  useUpdateTrianingMutation,
} from '../../data/supabase/trainingsApi'
import Table from '../../../shared/components/Table/Table'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import {
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedRows,
} from '../../data/trainingsSlice'
import TableActionsBtns from '../../../shared/components/TableActionsBtns/TableActionsBtns'
import { useEffect } from 'react'

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
  const { currentPage, pageSize, searchQuery } = useAppSelector((state) => state.trainingsUi)
  const { data: trainingsData, isLoading: isLoadingTrainings } = useGetTrainingsQuery({
    currentPage,
    pageSize,
    searchQuery,
  })
  const [deleteTraining] = useDeleteTrainingMutation({})
  const [updateTraining, { isLoading: isUpdatingTraining }] = useUpdateTrianingMutation({})

  const data = trainingsData?.data || []

  useEffect(() => {
    dispatch(setSearchQuery(''))
  }, [])

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
      width: 140,
      render: (training) => (
        <TableActionsBtns
          id={training.id}
          deleteAction={deleteTraining}
          modalTitle="Update training : "
          defaultValue={training.training}
          isLoading={isUpdatingTraining}
          updateAction={updateTraining}
        />
      ),
      align: 'center',
    },
  ]

  const totalData = trainingsData?.count

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      dispatch(setSelectedRows(selectedRows))
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
    <div className="table_container training_table">
      <Table
        totalData={totalData}
        handlePagination={handlePagination}
        currentPage={currentPage}
        pageSize={pageSize}
        itemRender={itemRender}
        columns={columns}
        rowSelection={rowSelection}
        // xScroll={560}
        data={data}
        isLoading={isLoadingTrainings}
      />
    </div>
  )
}
