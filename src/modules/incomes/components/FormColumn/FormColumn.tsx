interface FormColumnProps {
  children?: React.ReactNode
  placeHolder?: string
  label: string
  type: string
  className: string
  textarea: boolean
}

export default function FormColumn({
  children,
  placeHolder,
  label,
  type,
  className = '',
  textarea,
}: FormColumnProps) {
  if (children) return <div className="form_column">{children}</div>

  return (
    <div className={`form_column ${className}`}>
      <label>{label}</label>
      {textarea ? <textarea placeholder={placeHolder}/> : <input type={type} placeholder={placeHolder} />}
    </div>
  )
}
