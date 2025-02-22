import { Checkbox, Switch } from 'antd'
import toast from 'react-hot-toast'
import { useAppDispatch } from '../../store'
import { setCheckedListOfShownColumns } from '../../../incomes/data/incomesUiSlice'

export default function ColumnsShowOptions({ checkedList, columns }) {
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

              dispatch(setCheckedListOfShownColumns(newCheckedList))
            }}
            // className='column_show_options_switch'
          />
          <span>{title}</span>
        </div>
      ))}
    </div>
  )
}
