// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck


import { ExclamationCircleFilled } from '@ant-design/icons'
import { Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

export default function TableActionsBtns({
  deleteAction,
  id,
  defaultValue = 'hello',
  modalTitle,
  isLoading,
  updateAction,
}) {
  const { confirm } = Modal
  const [updatedName, setUpdatedName] = useState('')
  const [open, setOpen] = useState(false)

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure about deleting this item?`,
      icon: <ExclamationCircleFilled />,
      content: `Do you really want to delete this record ? This action cannot be undone  `,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      centered: true,
      async onOk() {
        const { error } = await deleteAction(id)

        if (error?.message) {
          console.log(error?.message)
          toast.error('Deleting failed !')
        } else {
          toast.success('Deleted succesfully ! ')
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    const { data } = await updateAction({ id: id, newName: updatedName })
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  useEffect(() => {
    setUpdatedName(defaultValue)
  }, [])

  return (
    <div className="table_btns_box">
      <button className="table_row_action_btn update_row_btn" onClick={showModal}>
        <HiOutlinePencil />
      </button>
      <button className="table_row_action_btn delete_row_btn" onClick={showDeleteConfirm}>
        <HiOutlineTrash />
      </button>
      <Modal
        title={modalTitle}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={[
          <button
            className="table_row_action_btn update_modal_btn"
            onClick={handleOk}
            disabled={isLoading}
          >
            update
          </button>,
        ]}
      >
        <div className="updating_row_form">
          <Input
            type="text"
            placeholder="enter new name ... "
            name="newName"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            status={updatedName.length === 0 ? 'error' : ''}
          />
          {updatedName.length === 0 ? (
            <p className="modal_update_error_msg">Updated Name cannot be empty !</p>
          ) : (
            ''
          )}
        </div>
      </Modal>
    </div>
  )
}
