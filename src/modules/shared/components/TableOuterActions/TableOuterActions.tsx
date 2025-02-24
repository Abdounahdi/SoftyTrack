import { useNavigate } from 'react-router'
import {
  HiMiniAdjustmentsVertical,
  HiMiniPlus,
  HiOutlineChevronDown,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2'

import { useAppDispatch, useAppSelector } from '../../store'
import { setShowColumnsOptionsIncomes } from '../../../incomes/data/incomesUiSlice'
import { setShowColumnsOptionsExpenses } from '../../../expenses/data/expensesUiSlice'

export function TableOuterActions({ where }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { showColumnsOptions } = useAppSelector((state) =>
    where === 'incomes' ? state.incomesUi : state.expensesUi
  )

  function hanldeShowColumns() {
    if (where === 'incomes') {
      console.log('hello ')
      dispatch(setShowColumnsOptionsIncomes())
    } else if (where === 'expenses') {
      console.log('hello')
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
