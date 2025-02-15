import { useNavigate } from 'react-router-dom'
import List from '../../components/List/List'
import Pagination from '../../components/Pagination/Pagination'
import { IQuery } from '../../data/todoTypes'
import { useState } from 'react'

const TodoList = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState<IQuery | null>({
    page: 1,
    limit: 10,
  })

  const handleCreate = () => {
    navigate('/todos-rtk/create')
  }

  return (
    <div className="todo_list_container">
      <div className="todo_list_container_header">
        <h1>Todos RTK Query</h1>
        <button className="create_btn" onClick={handleCreate}>
          Add New Todo
        </button>
      </div>

      <List query={query} />
      <Pagination query={query} setQuery={setQuery} />
    </div>
  )
}

export default TodoList
