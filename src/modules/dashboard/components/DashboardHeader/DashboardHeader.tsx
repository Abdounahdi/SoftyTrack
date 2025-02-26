import Filter from '../../../shared/components/Filter/Filter'
import PageHeading from '../../../shared/components/PageHeading/PageHeading'

export default function DashboardHeader() {
  const filterOptions = [
    {
      key: 'last-month',
      label: 'Last Month',
    },
    {
      key: 'last-three-months',
      label: 'Last 3 Month',
    },
    {
      key: 'last-year',
      label: 'Last Year',
    },
  ]
  return (
    <div className="title_filter_container">
      <PageHeading title="Dashboard" goBack={false} />
      <Filter filterOptions={filterOptions} style={{ justifySelf: 'end' }} />
    </div>
  )
}
