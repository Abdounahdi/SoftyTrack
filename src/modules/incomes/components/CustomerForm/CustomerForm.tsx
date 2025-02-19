import { Select } from 'antd'
import FormColumn from '../FormColumn/FormColumn'
import { Controller } from 'react-hook-form'

export default function CustomerForm({ trainings, register, control }) {
  return (
    <>
      <h2>Customer Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <FormColumn
            type="text"
            placeHolder="Customer Full Name ... "
            label="Full Name"
            register={register}
            value="name"
            error="i am an error"
          />
          <FormColumn
            type="tel"
            placeHolder="** *** *** "
            label="Phone Number"
            register={register}
            value="phone"
          />
          <FormColumn
            type="email"
            placeHolder="customer@example.com"
            label="Email"
            register={register}
            value="email"
          />
          <FormColumn label="Training Chosen" type="select">
            <label> Training Chosen </label>
            <Controller
              name="training"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  showSearch
                  className="form_column"
                  placeholder="Choose Training"
                  optionFilterProp="label"
                  options={trainings.map((training) => {
                    return { value: training.name, label: training.name }
                  })}
                />
              )}
            />
          </FormColumn>
        </div>
      </div>
    </>
  )
}
