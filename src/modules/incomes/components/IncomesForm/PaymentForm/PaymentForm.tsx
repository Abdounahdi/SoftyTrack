import { TagCustomized } from '../../../../shared/components/TagCustomized/TagCustomized'

export default function PaymentForm({ trainings }) {
  return (
    <>
      <h2>Payment Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <div className="form_column">
            <label> Price </label>
            <input type="number" placeholder="price to pay ..  " />
          </div>
          <div className="form_row slices_box_container">
            <div className="form_column slices_box">
              <label> Total Slices </label>
              <input type="number" />
            </div>
            <div className="form_column slices_box">
              <label> Paid Slices </label>
              <input type="number" />
            </div>
          </div>
          <div className="form_column">
            <label> Payment Method </label>
            <select>
              <option>Cash</option>
              <option>BankAccount</option>
              <option>Cheque</option>
            </select>
          </div>
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
          <div className="form_column">
            <label> Description </label>
            <textarea />
          </div>
        </div>
      </div>
    </>
  )
}
