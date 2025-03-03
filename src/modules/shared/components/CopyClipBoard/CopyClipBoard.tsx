// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import toast from 'react-hot-toast'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'

export default function CopyClipBoard({ children, item }) {
  function handleCopyAction() {
    navigator.clipboard.writeText(item)
    toast.success(`Copied ! `)
  }

  return (
    <div className="text_with_copy_clipboard_container">
      {children}
      <button className="copy_clipboard_btn" onClick={handleCopyAction}>
        <HiOutlineClipboardDocumentCheck />
      </button>
    </div>
  )
}
