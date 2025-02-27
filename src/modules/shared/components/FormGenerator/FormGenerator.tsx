import InputGenerator from '../InputGenerator/InputGenerator'

export default function FormGenerator({ options, control, register, disableAll = false }) {
  return (
    <>
      {options.map((formRowOptions) => {
        return (
          <div className="form_row">
            {formRowOptions.columns.map((formColumnOptions, index) => {
              return (
                <div className={`form_column ${formColumnOptions.className}`} key={index}>
                  <label>{formColumnOptions.label}</label>
                  <InputGenerator
                    inputOptions={formColumnOptions}
                    control={control}
                    register={register}
                    disableAll={disableAll}
                  />
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
