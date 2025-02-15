import { useParams } from 'react-router-dom'
import Form from '../../components/Form/Form'

const TodoCreateEdit = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="todo_create_edit_container">
      <Form isEdit={id ? true : false} />
    </div>
  )
}

export default TodoCreateEdit
