export default function FormCreateUpdateBtn({ update, isUpdating, isCreating, type }) {
  return (
    <button className="sumbit_button_create_update_form" disabled={isUpdating || isCreating}>
      {update
        ? isUpdating
          ? `Updating ${type} ... `
          : `Update ${type} `
        : isCreating
          ? `Creating ${type} ... `
          : `Create ${type}`}
    </button>
  )
}
