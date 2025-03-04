// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import InputGenerator from '../InputGenerator/InputGenerator'

export default function FormGenerator({
  options,
  control,
  register,
  disableAll = false,
  setValue,
  getValues,
}) {
  return (
    <>
      {options.map((formRowOptions) => {
        return (
          <div className="form_row">
            {formRowOptions.columns.map((formColumnOptions, index) => {
              return (
                <div className={`form_column ${formColumnOptions.className}`} key={index}>
                  <label
                    className={
                      formColumnOptions.value === 'paid_slices'
                        ? formColumnOptions.error
                          ? 'paid_slices_error_label'
                          : ''
                        : ''
                    }
                  >
                    {formColumnOptions.label}
                  </label>
                  <InputGenerator
                    inputOptions={formColumnOptions}
                    control={control}
                    register={register}
                    disableAll={disableAll}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  {formColumnOptions?.error ? (
                    <span
                      className={`error_form_column_generator
                        ${formColumnOptions.value === 'total_slices' ? 'error_total_slices' : ''}${formColumnOptions.value === 'paid_slices' ? 'error_total_paid_slices' : ''}`}
                    >
                      {formColumnOptions.error}
                    </span>
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
