import { useNavigate } from 'react-router'
import {
  HiMiniAdjustmentsVertical,
  HiMiniPlus,
  HiMiniTrash,
  HiOutlineChevronDown,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2'

import { useAppDispatch, useAppSelector } from '../../store'
import {
  setSelectedRows as setSelectedRowsIncomes,
  setShowColumnsOptionsIncomes,
} from '../../../incomes/data/incomesUiSlice'
import {
  setSelectedRows as setSelectedRowsExpenses,
  setShowColumnsOptionsExpenses,
} from '../../../expenses/data/expensesUiSlice'
import { ExclamationCircleFilled } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { useDeleteExpenseMutation } from '../../../expenses/data/supabaseApi/expensesApi'
import { useDeleteIncomeMutation } from '../../../incomes/data/supabaseApi/incomesApi'
import { Modal } from 'antd'

export function TableOuterActions({ where }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [deleteIncome] = useDeleteIncomeMutation({})
  const [deleteExpense] = useDeleteExpenseMutation({})

  const deleteItem = where === 'incomes' ? deleteIncome : deleteExpense

  const { showColumnsOptions, selectedRows } = useAppSelector((state) =>
    where === 'incomes' ? state.incomesUi : state.expensesUi
  )

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
          const { error } = await deleteItem(row.key)
          return error
        })
        console.log(errors)
        dispatch(setSelectedRowsIncomes([]))
        dispatch(setSelectedRowsExpenses([]))
        toast.success('Deleted succesfully ! ')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  function hanldeShowColumns() {
    if (where === 'incomes') {
      dispatch(setShowColumnsOptionsIncomes())
    } else if (where === 'expenses') {
      dispatch(setShowColumnsOptionsExpenses())
    }
  }

  return (
    <div className="table_actions_container">
      <div className="table_actions_btns_box">
        <button className="table_btn table_filter">
          <HiMiniAdjustmentsVertical />
          Filter
        </button>
        {selectedRows.length === 0 ? (
          ''
        ) : (
          <button className="table_btn table_delete" onClick={showDeleteConfirm}>
            <HiMiniTrash />
            Delete {selectedRows.length} Items
          </button>
        )}
      </div>
      <div className="table_actions_btns_box">
        <button
          onClick={hanldeShowColumns}
          className={`table_btn_show_columns_options table_btn ${showColumnsOptions ? 'opened_column_options' : ''}`}
        >
          <HiOutlineSquare3Stack3D />
          Columns
          <HiOutlineChevronDown className="arrow_down" />
        </button>
        <button className="table_button_create table_btn" onClick={() => navigate('create')}>
          <HiMiniPlus />
          <p>Create Income</p>
        </button>
      </div>
    </div>
  )
}
