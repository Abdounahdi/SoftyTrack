import toast from 'react-hot-toast'
import { HiEllipsisVertical } from 'react-icons/hi2'

export default function TableActions() {
  return (
    <button
      className="table_actions_btn"
      onClick={() => toast.loading('soon enough actions will be here !')}
    >
      <HiEllipsisVertical />
    </button>
  )
}
