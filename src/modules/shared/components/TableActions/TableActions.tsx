import { Dropdown } from 'antd'
import { HiEllipsisVertical, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'
import { Link } from 'react-router'

export default function TableActions() {
  const id = 354

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
          <span>Update</span>        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link className="table_action_option table_action_danger">
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
