import { HiMiniPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router'

export function IncomesActions() {
  const navigate = useNavigate()
  return (
    <div className="incomes_actions_container">
      <p>actions </p>
      <button className="incomes_button_create" onClick={() => navigate('create')}>
        <HiMiniPlus />
        <p>Create Income</p>
      </button>
    </div>
  )
}
