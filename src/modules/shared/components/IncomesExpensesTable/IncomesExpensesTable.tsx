import { Pagination, PaginationProps, Spin, Table } from 'antd'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

import { getIncomesColumns } from '../../../incomes/data/IncomesTableColumns'
import ColumnsShowOptions from '../ColumnsShowOptions/ColumnsShowOptions'
import incomesTableData from '../../../incomes/data/incomesTableData'
import expensesTableData from '../../../expenses/data/expensesTableData'
import { getExpensesColumns } from '../../../expenses/data/TableColumnsExpenses'
import FilterForm from '../FilterForm/FilterForm'

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

export default function IncomesExpensesTable({ where }) {
  const {
    isFetching,
    data,
    showColumnsOptions,
    selectedRows,
    pageSize,
    totalData,
    rowSelection,
    checkedList,
    handlePagination,
    newColumns,
    currentPage,
    showFilterOptions,
    filterFormInputs,
    maxSliderFilter,
    minSliderFilter,
    setFilterOptions,
  } = where === 'incomes' ? incomesTableData() : expensesTableData()

  const { expensesTableColumns } = getExpensesColumns()
  const { incomesTableColumns } = getIncomesColumns()

  if (isFetching) return <Spin size="large" />

  return (
    <>
      {showColumnsOptions ? (
        <ColumnsShowOptions
          checkedList={checkedList}
          columns={where === 'incomes' ? incomesTableColumns : expensesTableColumns}
          where={where}
        />
      ) : (
        ''
      )}

      {showFilterOptions ? (
        <FilterForm
          setFilter={setFilterOptions}
          filterOptions={filterFormInputs}
          sliderMin={maxSliderFilter}
          sliderMax={minSliderFilter}
        />
      ) : (
        ''
      )}

      <div className="table_container">
        <div className="">
          <Table
            className={'table'}
            pagination={false}
            dataSource={data}
            columns={newColumns}
            rowSelection={{
              type: 'checkbox',
              fixed: true,
              ...rowSelection,
            }}
            scroll={{ x: where === 'incomes' ? 2000 : 1000 }}
            loading={false}
          />
        </div>
        <Pagination
          total={totalData}
          showSizeChanger
          onChange={handlePagination}
          pageSizeOptions={['5', '10', '20']}
          current={currentPage}
          pageSize={pageSize.toString()}
          itemRender={itemRender}
        />
      </div>
    </>
  )
}
