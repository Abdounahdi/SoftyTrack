import { Pagination, PaginationProps, Spin, Table } from 'antd'
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'

import { incomesTableColumns } from '../../../incomes/data/TableColumnsObject'
import ColumnsShowOptions from '../ColumnsShowOptions/ColumnsShowOptions'
import incomesTableData from '../../../incomes/data/incomesTableData'
import expensesTableData from '../../../expenses/data/expensesTableData'
import { expensesTableColumns } from '../../../expenses/data/TableColumnsExpenses'

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
  } = where === 'incomes' ? incomesTableData() : expensesTableData()

  if (isFetching) return <Spin size="large" />

  console.log(data)

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

      <div className="table_container">
        <div className="">
          <Table
            className="table"
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
          pageSize={pageSize}
          itemRender={itemRender}
        />
      </div>
    </>
  )
}
