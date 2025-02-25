import { Link } from 'react-router'
import toast from 'react-hot-toast'
import { HiEllipsisVertical, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { Dropdown, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

export default function TableActions({
  id,
  where,
  buttonsOptions,
  deleteAction = () => console.log('no action '),
}) {
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
        const { error } = await deleteAction(id)
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
      key: 'details',
      label: (
        <Link to={`view/${id}`} className="table_action_option">
          <HiOutlineEye />
          <span>Details</span>
        </Link>
      ),
    },
    {
      key: 'update',
      label: (
        <Link to={`edit/${id}`} className="table_action_option">
          <HiOutlinePencil />
          <span>Update</span>
        </Link>
      ),
    },
    {
      key: 'delete',
      label: (
        <Link className="table_action_option table_action_danger" onClick={showDeleteConfirm}>
          <HiOutlineTrash />
          <span>Delete</span>
        </Link>
      ),
    },
  ]

  const itemsSpecified: MenuProps['items'] = buttonsOptions
    ? items.filter((item) => buttonsOptions.indexOf(item.key) !== -1)
    : items

  return (
    <Dropdown
      menu={{ items: itemsSpecified }}
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
