import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../shared/store'
import { getTodo } from '../../data/todoThunk'
import Form from '../../components/Form/Form'

const TodoCreateEdit = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) {
      dispatch(getTodo(id))
    }
  }, [id])

  return (
    <div className="todo_create_edit_container">
      <Form isEdit={id ? true : false} />
    </div>
  )
}

export default TodoCreateEdit
