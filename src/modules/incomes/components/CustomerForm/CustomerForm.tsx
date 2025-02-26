import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'

export default function CustomerForm({ inputs, register, control, disableAll }) {
  return (
    <>
      <h2>Customer Details</h2>
      <div className="create_form_box">
        <FormGenerator
          options={inputs}
          control={control}
          register={register}
          disableAll={disableAll}
        />
      </div>
    </>
  )
}
