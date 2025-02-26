import { useAppDispatch, useAppSelector } from '../../../shared/store'
import TrainingForm from '../../components/TrainingForm/TrainingForm'
import { useCreateTrainingMutation } from '../../data/supabase/trainingsApi'
import { setCreateFormIsOpen } from '../../data/trainingsSlice'

export default function TrainingCreate() {
  const { createFormIsOpen } = useAppSelector((state) => state.trainingsUi)
  const [createTraining, { isLoading: isCreating }] = useCreateTrainingMutation({})
  const dispatch = useAppDispatch()
  return (
    <div className={`drop_down_create_update_form ${createFormIsOpen ? 'fade_in' : 'fade_out'}`}>
      <TrainingForm
        createAction={createTraining}
        isLoading={isCreating}
        onCLose={() => dispatch(setCreateFormIsOpen())}
      />
    </div>
  )
}
