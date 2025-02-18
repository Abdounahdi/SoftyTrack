import { TagCustomized } from '../../../shared/components/TagCustomized/TagCustomized'
import FormColumn from '../FormColumn/FormColumn'

export default function PaymentForm({ trainings }) {
  return (
    <>
      <h2>Payment Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <FormColumn type="number" label="Price" placeHolder="price to pay" />
          <div className="form_row slices_box_container">
            <FormColumn type="number" label="Total Slices" className="slices_box" />
            <FormColumn type="number" label="Paid Slices" className="slices_box" />
          </div>
          <FormColumn type="select" label="Payment Method" className="">
            <label> Payment Method </label>
            <select>
              <option>Cash</option>
              <option>BankAccount</option>
              <option>Cheque</option>
            </select>
          </FormColumn>
        </div>
        <div className="form_row">
          <div className="form_column">
            <label> Location </label>
            <select>
              <option value="" disabled selected className="training_select_placeholder">
                Select location
              </option>
              {trainings?.map((training) => (
                <option key={training.id} value={training.name}>
                  <TagCustomized colors={{ bgColor: '#fff', textColor: '#fff' }}>
                    {training.name}
                  </TagCustomized>
                </option>
              ))}
            </select>
          </div>
          <FormColumn>
            <p>date Picker antd </p>
          </FormColumn>
        </div>
        <div className="form_row">
          <FormColumn textarea={true} placeHolder="description ... " label="Description" />
        </div>
      </div>
    </>
  )
}
