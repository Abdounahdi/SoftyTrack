import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'

export default function PaymentForm({ inputs, register, control, disableAll = false }) {
  return (
    <>
      <h2>Payment Details</h2>
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
