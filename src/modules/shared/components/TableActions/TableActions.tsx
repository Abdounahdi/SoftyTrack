import { Dropdown, Modal } from 'antd'
import { HiEllipsisVertical, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router'
import { ExclamationCircleFilled } from '@ant-design/icons'

export default function TableActions({ id }) {
  console.log(id)

  const { confirm } = Modal

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this row ?',
      icon: <ExclamationCircleFilled />,
      content: 'Do you really want to delete these records ? This action cannot be undone  ',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
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
