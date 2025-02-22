import { Checkbox, Switch } from 'antd'

export default function IncomesColumnsShowOptions({checkedList , columns}) {

  return (
    <div>
      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[])
        }}
      />
    </div>
  )
}
