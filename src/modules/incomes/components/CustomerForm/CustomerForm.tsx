import { TagCustomized } from '../../../shared/components/TagCustomized/TagCustomized'
import FormColumn from '../FormColumn/FormColumn'

export default function CustomerForm({ trainings }) {
  return (
    <>
      <h2>Customer Details</h2>
      <div className="create_form_box">
        <div className="form_row">
          <FormColumn type="text" placeHolder="Customer Full Name ... " label="Full Name" />
          <FormColumn type="tel" placeHolder="** *** *** " label="Phone Number" />
          <FormColumn type="email" placeHolder="customer@example.com" label="Email" />
          <FormColumn label="Training Chosen" type="select">
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
          </FormColumn>
        </div>
      </div>
    </>
  )
}
