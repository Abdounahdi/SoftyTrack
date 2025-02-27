import { useNavigate } from 'react-router'
import {
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
import { Dropdown, Modal } from 'antd'
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
          const { error } = await deleteAction(row.key)
          return error
        })
        console.log(errors)
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
      <div className="table_actions_btns_box">
        {actionsOptions.left?.map((option) => (
          <ActionGenerator
            type={option}
            selectedRows={selectedRows}
            handleShowColumns={handleShowColumns}
            showColumnsOptions={showColumnsOptions}
            onCreate={() => {
              if (!createAction) {
                navigate('create')
              } else {
                createAction()
              }
            }}
            showDeleteConfirm={showDeleteConfirm}
          />
        ))}
      </div>
      <div className="table_actions_btns_box">
        {actionsOptions.right?.map((option) => (
          <ActionGenerator
            type={option}
            selectedRows={selectedRows}
            handleShowColumns={handleShowColumns}
            showColumnsOptions={showColumnsOptions}
            onCreate={() => {
              if (!createAction) {
                navigate('create')
              } else {
                createAction()
              }
            }}
            showDeleteConfirm={showDeleteConfirm}
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
}) {
  if (type === 'filter') {
    return (
      <Filter
        field="filter-options"
        filterOptions={[
          {
            key: 'date-asc',
            label: 'Date (Oldest First)',
          },
          {
            key: 'date-desc',
            label: 'Date (Recent First)',
          },
          {
            key: 'amount-asc',
            label: 'Amount (Smallest First)',
          },
          {
            key: 'amount-des',
            label: 'Amount (Largest First)',
          },
        ]}
        style={{ justifySelf: 'end' }}
      />
    )
  }
  if (type === 'delete') {
    return (
      <>
        {selectedRows.length === 0 ? (
          ''
        ) : (
          <button className="table_btn table_delete" onClick={showDeleteConfirm}>
            <HiMiniTrash />
            Delete {selectedRows.length} Item{selectedRows.length !== 1 ? 's' : ''}
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
        <p>Create Income</p>
      </button>
    )
  }

  return <button>We still Dont have this action </button>
}
