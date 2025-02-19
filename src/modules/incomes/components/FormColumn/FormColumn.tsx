// interface FormColumnProps {
//   children?: React.ReactNode
//   placeHolder?: string
//   label: string
//   type: string
//   className: string
//   textarea: boolean
// }

export default function FormColumn({
  children,
  placeHolder,
  label,
  type,
  className = '',
  textarea,
  value,
  register,
  error = null,
}) {
  if (children) return <div className="form_column">{children}</div>

  return (
    <>
      <div className={`form_column ${className}`}>
        <label>{label}</label>
        {textarea ? (
          <textarea
            placeholder={placeHolder}
            {...register(value, { required: 'This field is required ' })}
          />
        ) : (
          <input
            type={type}
            placeholder={placeHolder}
            {...register(value, {
              required: 'This field is required',
            })}
          />
        )}
      {error ? <p className="error_message_form">{error}</p> : ''}
      </div>
    </>
  )
}
