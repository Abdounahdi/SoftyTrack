import { HiOutlineBanknotes, HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { TbPigMoney } from 'react-icons/tb'
import LastTransactions from '../../components/LastTransactions/LastTransactions'
import PieChart from '../../components/PieChart/PieChart'
import AreaChart from '../../components/AreaChart/AreaChart'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import Stats from '../../components/Stats/Stats'
import { useGetIncomesByTimeQuery } from '../../data/supabase/dashboardApi'
import { useSearchParams } from 'react-router'

const stats = [
  {
    label: 'Total Incomes',
    value: 1200,
    icon: <HiOutlineBanknotes />,
    color: '#2E71E2',
  },
  {
    label: 'Total Expenses',
    value: 576,
    icon: <HiOutlineCurrencyDollar />,
    color: '#2BA5BD',
  },
  {
    label: 'Total Revenus',
    value: 1200 - 576,
    icon: <TbPigMoney />,
    color: '#28d997',
  },
]

export default function Dashboard() {
  const [searchParams] = useSearchParams()

  const when = searchParams.get('filter-by-time')

  const minus = when === 'last-month' ? 30 : when === 'last-three-months' ? 90 : 360

  console.log(minus)

  const pastDate = new Date(new Date().setDate(new Date().getDate() - 30))
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '+00')

  console.log(pastDate)

  const { data, isLoading } = useGetIncomesByTimeQuery({ date: '23-23-23' })

  return (
    <>
      <div className="dashboard_page_layout_main_container">
        <DashboardHeader />
        <Stats stats={stats} />
        <div className="incomes_expenses_summary_container">
          <LastTransactions title="Last Incomes" viewPath="/incomes" />
          <PieChart title="Incomes  " />
        </div>
        <div className="incomes_expenses_summary_container">
          <PieChart title="Expenses  " />
          <LastTransactions title="Last Expenses" viewPath="/expenses" />
        </div>
        <div className="summary_container">
          <AreaChart />
        </div>
      </div>
    </>
  )
}
