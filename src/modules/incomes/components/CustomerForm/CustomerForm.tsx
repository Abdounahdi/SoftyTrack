import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'

export default function CustomerForm({ trainings, register, control, errors }) {
  const trainingsOptions = trainings.map((training) => {
    return { value: training.id, label: training.training }
  })

  const customerFormInputs = [
    {
      columns: [
        {
          label: 'Full Name',
          type: 'text',
          value: 'customer_name',
          placeHolder: 'customer full name ... ',
          error: errors?.customer_name?.message,
        },
        {
          label: 'Phone Number',
          type: 'tel',
          value: 'phone',
          placeHolder: '** *** ***',
          error: errors?.phone?.message,
        },
        {
          label: 'Email',
          type: 'email',
          value: 'email',
          placeHolder: 'customer@example.com',
          error: errors?.email?.message,
        },
        {
          label: 'Training Chosen',
          type: 'select',
          selectOptions: trainingsOptions,
          name: 'training',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.training?.message,
        },
      ],
    },
  ]
  return (
    <>
      <h2>Customer Details</h2>
      <div className="create_form_box">
        <FormGenerator
          options={customerFormInputs}
          control={control}
          register={register}
        />
      </div>
    </>
  )
}
