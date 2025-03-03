import { data, useNavigate } from 'react-router'
import {
  HiMagnifyingGlass,
  HiMiniAdjustmentsVertical,
  HiMiniPlus,
  HiMiniTrash,
  HiOutlineChevronDown,
  HiOutlineFunnel,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2'

import { useAppDispatch } from '../../store'
import { ExclamationCircleFilled } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { Dropdown, Input, Modal, Select } from 'antd'
import FilterTable from '../FilterTable/FilterTable'
import Filter from '../Filter/Filter'

export function TableOuterActions({
  deleteAction,
  resetSelectedRows,
  handleShowColumns,
  showColumnsOptions,
  selectedRows,
  actionsOptions,
  createAction,
  handleFilterOptionsShow,
  where,
  dataSearch,
  onSearch,
}) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { confirm } = Modal

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure delete ${selectedRows.length} items?`,
      icon: <ExclamationCircleFilled />,
      content: `Do you really want to delete these ${selectedRows.length} records ? This action cannot be undone  `,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      centered: true,
      async onOk() {
        const errors = selectedRows.map(async (row) => {
          console.log(row)
          const { error } = await deleteAction(row.key || row.id)
          return error
        })

        dispatch(resetSelectedRows([]))
        toast.success('Deleted succesfully ! ')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div className="table_actions_container">
      <div className="table_actions_btns_box table_actions_left">
        {actionsOptions.left?.map((option) => (
          <ActionGenerator
            type={option}
            selectedRows={selectedRows}
            handleShowColumns={handleShowColumns}
            showColumnsOptions={showColumnsOptions}
            handleFilterOptionsShow={handleFilterOptionsShow}
            onCreate={() => {
              if (!createAction) {
                navigate('create')
              } else {
                createAction()
              }
            }}
            showDeleteConfirm={showDeleteConfirm}
            searchAction={onSearch}
          />
        ))}
      </div>
      <div className="table_actions_btns_box">
        {actionsOptions.right?.map((option) => (
          <ActionGenerator
            type={option}
            selectedRows={selectedRows}
            handleShowColumns={handleShowColumns}
            handleFilterOptionsShow={handleFilterOptionsShow}
            showColumnsOptions={showColumnsOptions}
            onCreate={() => {
              if (!createAction) {
                navigate('create')
              } else {
                createAction()
              }
            }}
            showDeleteConfirm={showDeleteConfirm}
            where={where}
            searchAction={onSearch}
          />
        ))}
      </div>
    </div>
  )
}

function ActionGenerator({
  type,
  selectedRows,
  handleShowColumns,
  showColumnsOptions,
  onCreate,
  showDeleteConfirm,
  items,
  handleFilterOptionsShow,
  where = 'Uknown',
  searchAction,
}) {
  if (type === 'filter') {
    return (
      // <Filter
      //   field="filter-options"
      //   filterOptions={[
      //     {
      //       key: 'date-asc',
      //       label: 'Date (Oldest First)',
      //     },
      //     {
      //       key: 'date-desc',
      //       label: 'Date (Recent First)',
      //     },
      //     {
      //       key: 'amount-asc',
      //       label: 'Amount (Smallest First)',
      //     },
      //     {
      //       key: 'amount-des',
      //       label: 'Amount (Largest First)',
      //     },
      //   ]}
      //   style={{ justifySelf: 'end' }}
      // />

      <FilterTable className="table_btn table_filter" onClick={handleFilterOptionsShow} />
    )
  }
  if (type === 'delete') {
    console.log(selectedRows)
    return (
      <>
        {selectedRows.length === 0 ? (
          ''
        ) : (
          <button className="table_btn table_delete" onClick={showDeleteConfirm}>
            <HiMiniTrash />
            {selectedRows.length} Item{selectedRows.length !== 1 ? 's' : ''}
          </button>
        )}
      </>
    )
  }
  if (type === 'showColumns') {
    return (
      <button
        onClick={handleShowColumns}
        className={`table_btn_show_columns_options table_btn ${showColumnsOptions ? 'opened_column_options' : ''}`}
      >
        <HiOutlineSquare3Stack3D />
        Columns
        <HiOutlineChevronDown className="arrow_down" />
      </button>
    )
  }
  if (type === 'create') {
    return (
      <button className="table_button_create table_btn" onClick={() => onCreate()}>
        <HiMiniPlus />
        <p>
          Create {where[0].toUpperCase()}
          {where.slice(1)}
        </p>
      </button>
    )
  }

  if (type === 'search') {
    const dispatch = useAppDispatch()
    const onSearch = (e) => {
      dispatch(searchAction(e.target.value))
    }
    return (
      <div className="search_table_outer_actions">
        <Input
          className="search_input_table_outer_actions"
          // showSearch
          placeholder="Search ... "
          // optionFilterProp="label"
          // onChange={onChange}
          // onSearch={onSearch}
          // options={dataSearch}
          onChange={onSearch}
        />
        {/* <button className='search_query_btn'><HiMagnifyingGlass/></button> */}
      </div>
    )
  }

  return <button>We still Dont have this action </button>
}
