import { useForm } from 'react-hook-form'
import FormGenerator from '../../../shared/components/FormGenerator/FormGenerator'
import { HiXMark } from 'react-icons/hi2'

export default function TrainingForm({
  update = false,
  disable = false,
  createAction,
  isLoading,
  onCLose,
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm()

  async function onSuccess(obj) {
    const { data } = await createAction(obj)
    console.log('this is the returned value', data)
  }

  function onError(err) {
    console.error(err)
  }

  const expenseFormBlankOptions = [
    {
      columns: [
        {
          label: 'Training Name',
          type: 'text',
          value: 'training',
          placeHolder: 'add training ... ',
          error: errors?.training?.message,
          defaultValue: null,
        },
      ],
    },
  ]

  return (
    <form className="customer_create_form" onSubmit={handleSubmit(onSuccess, onError)}>
      <div className="create_form_container">
        <div className="create_form_box training_create_form_box">
          <button
            className="close_form_btn"
            onClick={() => {
              onCLose()
              reset()
            }}
            type="reset"
          >
            <HiXMark />
          </button>
          <FormGenerator
            options={expenseFormBlankOptions}
            control={control}
            register={register}
            disableAll={false}
          />
          <button className="create_update_form_training_category_btn" disabled={isLoading}>
            {isLoading ? 'Creating ... ' : 'Create'}
          </button>
        </div>
        {/* {disabled ? (
          ''
        ) : (
          <FormCreateUpdateBtn
            type="expense"
            isCreating={isCreating}
            isUpdating={isUpdating}
            update={update}
          />
        )} */}
      </div>
    </form>
  )
}
