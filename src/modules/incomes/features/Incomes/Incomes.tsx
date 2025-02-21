
import PageHeading from '../../../shared/components/PageHeading/PageHeading'
// import { useAppSelector } from '../../../shared/store'
import { IncomesActions } from '../../components/IncomesActions/IncomesActions'
import IncomesTable from '../../components/IncomesTable/IncomesTable'

export default function Incomes() {
  // const { role } = useAppSelector((state) => state.auth)
  // console.log(role)

  

  return (
    <div className="incomes_page_layout">
      <PageHeading title="Incomes" goBack={true} />
      <IncomesActions />
      <IncomesTable />
      
    </div>
  )
}

