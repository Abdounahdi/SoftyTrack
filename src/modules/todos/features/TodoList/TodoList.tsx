import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { getAllTodos } from '../../data/todoThunk'
import List from '../../components/List/List'
import Pagination from '../../components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'

const TodoList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { query } = useAppSelector((state) => state.todos)

  const handleCreate = () => {
    navigate('/todos/create')
  }

  useEffect(() => {
    dispatch(
      getAllTodos({
        page: query.page,
        limit: query.limit,
      })
    )
      .unwrap()
      .then(() => {
        console.log('all todos fetched')
      })
      .catch((err) => {
        console.error(err)
      })
  }, [query.page, query.limit])

  return (
    <div className="todo_list_container">
      <div className="todo_list_container_header">
        <h1>Todos Redux Toolkit</h1>
        <button className="create_btn" onClick={handleCreate}>
          Add New Todo
        </button>
      </div>
      <List />
      <Pagination />
    </div>
  )
}

export default TodoList
