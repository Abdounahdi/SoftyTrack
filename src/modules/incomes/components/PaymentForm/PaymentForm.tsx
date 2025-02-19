import { DatePicker, Select } from 'antd'
import FormColumn from '../FormColumn/FormColumn'
import { Controller } from 'react-hook-form'

export default function PaymentForm({ register, control }) {
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

  return (
    <>
      <h2>Payment Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <FormColumn
            type="number"
            label="Price"
            placeHolder="price to pay"
            register={register}
            value="price"
          />
          <div className="form_row slices_box_container">
            <FormColumn
              type="number"
              label="Total Slices"
              className="slices_box"
              register={register}
              value="total_slices"
            />
            <FormColumn
              type="number"
              label="Paid Slices"
              className="slices_box"
              register={register}
              value="slice_count"
            />
          </div>
          <FormColumn>
            <label> Payment Method </label>
            <Controller
              name="payment_method"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  showSearch
                  className="form_column"
                  placeholder="Select a method"
                  optionFilterProp="label"
                  options={paymentMethods}
                />
              )}
            />
          </FormColumn>
        </div>
        <div className="form_row">
          <FormColumn>
            <label> Location </label>
            <Controller
              name="reception_location"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  showSearch
                  className="form_column"
                  placeholder="Select a location"
                  optionFilterProp="label"
                  options={locationOptions}
                />
              )}
            />
          </FormColumn>
          <FormColumn>
            <label>Date Of Income</label>
            <Controller
              name="date_created"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker className="form_column" {...field} />
              )}
            />
          </FormColumn>
          <FormColumn
            type="text"
            label="Receptionist Full Name "
            placeHolder="user name "
            register={register}
            value="user"
          />
        </div>
        <div className="form_row">
          <FormColumn
            textarea={true}
            placeHolder="description ... "
            label="Description"
            register={register}
            value="description"
          />
        </div>
      </div>
    </>
  )
}
