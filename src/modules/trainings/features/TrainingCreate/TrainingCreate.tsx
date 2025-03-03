import { Input, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../shared/store'
import { useCreateTrainingMutation } from '../../data/supabase/trainingsApi'
import { setCreateFormIsOpen } from '../../data/trainingsSlice'
import { useState } from 'react'

export default function TrainingCreate() {
  const { createFormIsOpen } = useAppSelector((state) => state.trainingsUi)
  const [createTraining, { isLoading: isCreating }] = useCreateTrainingMutation({})
  const dispatch = useAppDispatch()

  const [newTraining, setNewTraining] = useState('')
  const [error, setError] = useState(false)

  const handleOk = () => {
    if (newTraining.length === 0) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    } else {
      createTraining(newTraining)
      setTimeout(() => {
        dispatch(setCreateFormIsOpen())
      }, 500)
    }
  }
  const handleCancel = () => {
    dispatch(setCreateFormIsOpen())
  }

  return (
    <div className={`drop_down_create_update_form ${createFormIsOpen ? 'fade_in' : 'fade_out'}`}>
      <Modal
        title={'Create Training'}
        open={createFormIsOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <button
            className="table_row_action_btn update_modal_btn create_btn_modal"
            onClick={handleOk}
            disabled={isCreating}
          >
            {isCreating ? 'Creating ... ' : 'Create'}
          </button>,
        ]}
      >
        <div className="updating_row_form">
          <Input
            type="text"
            placeholder="enter new name ... "
            name="newName"
            value={newTraining}
            onChange={(e) => setNewTraining(e.target.value)}
            status={error ? 'error' : ''}
          />
          {error ? (
            <p className={`modal_update_error_msg ${error ? 'fade_in' : 'fade_out'}`}>
              New Training cannot be empty !
            </p>
          ) : (
            ''
          )}
        </div>
      </Modal>
    </div>
  )
}
