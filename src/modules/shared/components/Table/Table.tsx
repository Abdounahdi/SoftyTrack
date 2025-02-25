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
<<<<<<< HEAD
  isLoading,
=======
  isLoading
>>>>>>> f7fcd22949f691139c6f9ed35f2e6f2947e19036
}) {
  return (
    <>
      <div className="">
        <TableAntD
          className="table"
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
<<<<<<< HEAD
          rowKey="id"
=======
>>>>>>> f7fcd22949f691139c6f9ed35f2e6f2947e19036
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
