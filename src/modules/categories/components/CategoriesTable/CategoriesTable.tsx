// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useEffect } from 'react'
import { PaginationProps, Table as TableAntD } from 'antd'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

import {
  useDeleteCategoriesMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../data/supabase/categoriesApi'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import {
  setCurrentPage,
  setPageSize,
  setSearchQuery,
  setSelectedRows,
} from '../../data/categoriesSlice'

import Table from '../../../shared/components/Table/Table'
import TableActionsBtns from '../../../shared/components/TableActionsBtns/TableActionsBtns'

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

export default function CategoriesTable() {
  const dispatch = useAppDispatch()
  const { currentPage, pageSize, searchQuery } = useAppSelector((state) => state.categoriesUi)
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({
    currentPage,
    pageSize,
    searchQuery,
  })
  const [deleteCategory] = useDeleteCategoriesMutation({})
  const [updateCategory, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation({})

  const data = categoriesData?.data || []

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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
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
      render: (category) => (
        <TableActionsBtns
          id={category.id}
          deleteAction={deleteCategory}
          modalTitle="Update training : "
          defaultValue={category.category}
          isLoading={isUpdatingCategory}
          updateAction={updateCategory}
        />
      ),
      align: 'center',
    },
  ]

  const totalData = categoriesData?.count

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
        isLoading={isLoadingCategories}
      />
    </div>
  )
}
