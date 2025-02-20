import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'

export default function PaymentForm({ register, control, errors }) {
  const paymentMethods = [
    {
      value: 'Cash',
      label: 'Cash',
    },
    {
      value: 'BankAccount',
      label: 'BankAccount',
    },
    {
      value: 'Cheque',
      label: 'Cheque',
    },
  ]

  const locationOptions = [
    {
      value: 'hammemSousse',
      label: 'Hammem Sousse',
    },
    {
      value: 'TakiAcademy',
      label: 'TakiAcademy',
    },
    {
      value: 'Sahloul',
      label: 'Sahloul',
    },
  ]
  const receptionistOptions = [
    {
      value: 'hammemSousse',
      label: 'Hammem Sousse',
    },
    {
      value: 'TakiAcademy',
      label: 'TakiAcademy',
    },
    {
      value: 'Sahloul',
      label: 'Sahloul',
    },
  ]

  const paymentFormInputs = [
    {
      columns: [
        {
          label: 'Price',
          type: 'number',
          value: 'price',
          placeHolder: 'price to pay ... ',
          error: errors?.price?.message,
        },
        {
          label: 'Total Slices',
          type: 'number',
          value: 'total_slices',
          placeHolder: '',
          error: errors?.total_slices?.message,
          className: 'slices_box_width_small',
        },
        {
          label: 'Paid Slices',
          type: 'number',
          value: 'paid_slices',
          placeHolder: '',
          error: errors?.paid_slices?.message,
          className: 'slices_box_width_small',
        },
        {
          label: 'Payment Method',
          type: 'select',
          selectOptions: paymentMethods,
          name: 'payment_method',
          createOption: true,
          placeHolder: 'Choose Training ... ',
          error: errors?.payment_method?.message,
        },
      ],
    },
    {
      columns: [
        {
          label: 'Reception Local',
          type: 'select',
          name: 'location',
          selectOptions: locationOptions,
          placeHolder: 'select location ... ',
          error: errors?.location?.message,
        },
        {
          label: 'Date of income',
          type: 'date',
          value: 'date_created',
          placeHolder: '',
          error: errors?.date_created?.message,
        },
        {
          label: 'Receptionist',
          type: 'select',
          selectOptions: receptionistOptions,
          name: 'receptionist',
          createOption: false,
          placeHolder: ' ',
          error: errors?.receptionist?.message,
        },
      ],
    },
  ]

  return (
    <>
      <h2>Payment Details</h2>
      <div className="create_form_box">
        <FormGenerator options={paymentFormInputs} control={control} register={register} />
      </div>
    </>
  )
}
