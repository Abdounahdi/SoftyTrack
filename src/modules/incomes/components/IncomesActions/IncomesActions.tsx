import { HiMiniPlus, HiOutlineChevronDown, HiOutlineSquare3Stack3D } from 'react-icons/hi2'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { setShowColumnsOptions } from '../../data/incomesUiSlice'

export function IncomesActions() {
  const navigate = useNavigate()
  const { showColumnsOptions } = useAppSelector((state) => state.incomesUi)
  const dispatch = useAppDispatch()
  return (
    <div className="incomes_actions_container">
      <div></div>
      <div className="incomes_actions_btns_box">
        <button
          onClick={() => dispatch(setShowColumnsOptions())}
          className={`incomes_btn_show_columns_options incomes_btn ${showColumnsOptions ? 'opened_column_options' : ''}`}
        >
          <HiOutlineSquare3Stack3D />
          Columns
          <HiOutlineChevronDown className="arrow_down" />
        </button>
        <button className="incomes_button_create incomes_btn" onClick={() => navigate('create')}>
          <HiMiniPlus />
          <p>Create Income</p>
        </button>
      </div>
    </div>
  )
}
