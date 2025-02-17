import PageHeading from '../../../shared/components/PageHeading/PageHeading'
import IncomesTable from '../../components/IncomesTable/IncomesTable'


export default function Incomes() {
  return (
    <div className="incomes_page_layout">
      <PageHeading title="Incomes" goBack={true} />
      <PageHeading title="actions" goBack={false}/>
      <IncomesTable/>
    </div>
  )
}
