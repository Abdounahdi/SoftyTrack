// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { Pagination, Table as TableAntD } from 'antd'

export default function Table({
  data,
  columns,
  rowSelection,
  xScroll,
  totalData,
  handlePagination,
  currentPage,
  pageSize,
  itemRender,
  isLoading,
}) {
  return (
    <>
      <div className="">
        <TableAntD
          className="table_antd table"
          pagination={false}
          dataSource={data}
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            fixed: true,
            ...rowSelection,
          }}
          scroll={{ x: xScroll }}
          loading={isLoading}
          rowKey="id"
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
    </>
  )
}
