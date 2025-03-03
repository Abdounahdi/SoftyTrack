import { Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useCreateCategorieMutation } from '../../data/supabase/categoriesApi'
import { setCreateFormIsOpen } from '../../data/categoriesSlice'
import { useState } from 'react'

export default function CategoriesCreate() {
  const dispatch = useAppDispatch()
  const { createFormIsOpen } = useAppSelector((state) => state.categoriesUi)
  const [createCategory, { isLoading: isCreatingCategory, error: errorCreating }] =
    useCreateCategorieMutation({})
  const [newCategory, setNewCategory] = useState('')
  const [error, setError] = useState(false)

  const handleOk = () => {
    if (newCategory.length === 0) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    } else {
      createCategory(newCategory)
      setTimeout(() => {
        dispatch(setCreateFormIsOpen())
      }, 500)
    }
  }
  const handleCancel = () => {
    dispatch(setCreateFormIsOpen())
  }

  return (
    <Modal
      title={'Create Category'}
      open={createFormIsOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      footer={[
        <button
          className="table_row_action_btn update_modal_btn create_btn_modal"
          onClick={handleOk}
          disabled={isCreatingCategory}
        >
          {isCreatingCategory ? 'Creating ... ' : 'Create'}
        </button>,
      ]}
    >
      <div className="updating_row_form">
        <Input
          type="text"
          placeholder="enter new name ... "
          name="newName"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          status={error ? 'error' : ''}
        />
        {error ? <p className="modal_update_error_msg">New Category cannot be empty !</p> : ''}
      </div>
    </Modal>
  )
}
