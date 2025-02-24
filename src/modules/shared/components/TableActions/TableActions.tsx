import { Dropdown, Modal } from 'antd'
import { HiEllipsisVertical, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useDeleteIncomeMutation } from '../../../incomes/data/supabaseApi/incomesApi'
import toast from 'react-hot-toast'
import { useDeleteExpenseMutation } from '../../../expenses/data/supabaseApi/expensesApi'

export default function TableActions({ id, where }) {
  const [deleteIncome] = useDeleteIncomeMutation({})
  const [deleteExpense] = useDeleteExpenseMutation({})

  const deleteItem = where === 'incomes' ? deleteIncome : deleteExpense


  const { confirm } = Modal

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this row ?',
      icon: <ExclamationCircleFilled />,
      content: 'Do you really want to delete these records ? This action cannot be undone  ',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      centered: true,
      async onOk() {
        const { error } = await deleteItem(id)
        if (!error) {
          toast.success('Income deleted succesfully ! ')
        } else {
          toast.error('Something went wrong !')
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={`view/${id}`} className="table_action_option">
          <HiOutlineEye />
          <span>Details</span>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to={`edit/${id}`} className="table_action_option">
          <HiOutlinePencil />
          <span>Update</span>
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link className="table_action_option table_action_danger" onClick={showDeleteConfirm}>
          <HiOutlineTrash />
          <span>Delete</span>
        </Link>
      ),
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      trigger="click"
    >
      <button className="table_actions_btn">
        <HiEllipsisVertical />
      </button>
    </Dropdown>
  )
}
