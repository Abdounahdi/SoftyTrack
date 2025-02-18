import { TagCustomized } from '../../../../shared/components/TagCustomized/TagCustomized'

export default function CustomerForm({ trainings }) {
  return (
    <>
      <h2>Customer Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <div className="form_column">
            <label> Full Name </label>
            <input type="text" placeholder="Customer Full Name ... " />
          </div>
          <div className="form_column">
            <label> Phone Number </label>
            <input type="tel" placeholder="** *** ***" />
          </div>
          <div className="form_column">
            <label> Email </label>
            <input type="email" placeholder="customer@example.com " />
          </div>
          <div className="form_column">
            <label> Training Chosen </label>
            <select>
              <option value="" disabled selected className="training_select_placeholder">
                Select your option
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
        </div>
      </div>
    </>
  )
}
