import {
  HiMiniAdjustmentsVertical,
  HiMiniPlus,
  HiOutlineChevronDown,
  HiOutlineSquare3Stack3D,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store'
import { setShowColumnsOptions } from '../../../incomes/data/incomesUiSlice'

export function TableOuterActions({ where }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { showColumnsOptions } = useAppSelector((state) => state.incomesUi)

  return (
    <div className="table_actions_container">
      <div className="table_actions_btns_box">
        <button className="table_btn table_filter">
          {' '}
          <HiMiniAdjustmentsVertical />
          Filter
        </button>
      </div>
      <div className="table_actions_btns_box">
        <button
          onClick={() => dispatch(setShowColumnsOptions())}
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
