import { Switch } from 'antd'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../store'
import {
  setCheckedListOfShownColumnsExpeneses,
  setShowColumnsOptionsExpenses,
} from '../../../expenses/data/expensesUiSlice'
import { SharedSwitchValue } from '../../store/slices/sharedSlice'

export default function ColumnsShowOptions({ checkedList, columns, where }) {
  // const options = columns.map(({ key, title }) => ({ value: key, label: title }))
  const dispatch = useAppDispatch()
  return (
    <div className="columns_show_options_switch_container">
      {columns.map(({ key, title }) => (
        <div key={key} className="column_show_options_switch_box">
          <Switch
            checked={checkedList.includes(key)}
            onChange={(checked) => {
              const newCheckedList = checked
                ? [...checkedList, key]
                : checkedList.filter((item) => item !== key)

              if (newCheckedList.length === 0) {
                toast.error('Table must have at least one column')
                return
              }


              where === 'incomes'
                ? dispatch(SharedSwitchValue({ key: 'columnsIncomes', value: newCheckedList }))
                 : dispatch(SharedSwitchValue({ key: 'columnsExpenses', value: newCheckedList }))
                // :  dispatch(setCheckedListOfShownColumnsExpeneses(newCheckedList))
            }}
          />
          <span>{title}</span>
        </div>
      ))}
    </div>
  )
}
