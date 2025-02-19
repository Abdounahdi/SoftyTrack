import InputGenerator from '../InputGenerator/InputGenerator'

export default function FormGenerator({ options }) {
  return (
    <>
      {options.map((formRowOptions) => {
        return (
          <div className="form_row">
            {formRowOptions.columns.map((formColumnOptions) => {
              return (
                <div className={`form_column ${formColumnOptions.className}`}>
                  <label>{formColumnOptions.label}</label>
                  <InputGenerator inputOptions={formColumnOptions} />
                  {formColumnOptions?.error ? (
                    <span className="error_form_column_generator">{formColumnOptions.error}</span>
                  ) : (
                    ''
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}
