import PageActionLayout from '../../../shared/components/IncomesExpensesActionsPageLayout/PageActionLayout'
import CategoriesActions from '../../components/CategoriesActions/CategoriesActions'
import CategoriesCreate from '../../components/CategoriesCreate/CategoriesCreate'
import CategoriesTable from '../../components/CategoriesTable/CategoriesTable'

export default function Categories() {
  return (
    <>
      <PageActionLayout title="Categories" goBack={true}>
        <CategoriesActions/>
        <CategoriesCreate/>
        <CategoriesTable/>
      </PageActionLayout>
    </>
  )
}
