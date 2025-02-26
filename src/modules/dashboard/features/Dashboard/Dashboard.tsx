import { HiOutlineBanknotes, HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { TbPigMoney } from 'react-icons/tb'
import LastTransactions from '../../components/LastTransactions/LastTransactions'
import PieChart from '../../components/PieChart/PieChart'
import AreaChart from '../../components/AreaChart/AreaChart'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import Stats from '../../components/Stats/Stats'
import { useGetIncomesByTimeQuery } from '../../data/supabase/dashboardApi'
import { useSearchParams } from 'react-router'
import { Spin } from 'antd'

export default function Dashboard() {
  const [searchParams] = useSearchParams()

  const when = searchParams.get('filter-by-time')

  const minus = when === 'Last Month' ? 30 : when === 'Last 3 Months' ? 90 : 365
  const { data: incomes, isFetching: isLoadingTraining } = useGetIncomesByTimeQuery({ minus })

  if (isLoadingTraining) return <Spin />

  const stats = [
    {
      label: 'Total Incomes',
      value: incomes?.map((income) => income?.price).reduce((acc, cur) => acc + cur, 0),
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
  const { incomesData, incomesPieChartOptions } = incomesDashboardData(incomes)

  return (
    <>
      <div className="dashboard_page_layout_main_container">
        <DashboardHeader />
        <Stats stats={stats} />
        <div className="incomes_expenses_summary_container">
          <LastTransactions title="Last Incomes" viewPath="/incomes" data={incomesData} />
          <PieChart title="Incomes" options={incomesPieChartOptions} />
        </div>
        <div className="incomes_expenses_summary_container">
          {/* <PieChart title="Expenses  " /> */}
          <LastTransactions title="Last Expenses" viewPath="/expenses" />
        </div>
        <div className="summary_container">
          <AreaChart />
        </div>
      </div>
    </>
  )
}

function incomesDashboardData(incomes) {
  const incomesPieChartOptions = []

  const incomesData = incomes
    .map((income) => {
      return {
        key: income.id,
        training: income.training_id.training,
        price: income.price,
        slicesPrecentage: ` ${income.total_slices}-${income.paid_slices} `,
        customerName: income.customer_id.full_name,
      }
    })
    .slice(0, 5)

  const incomesTrainings = new Set()
  incomes.map((income) => incomesTrainings.add(income.training_id.training))

  incomesTrainings.forEach((training) => {
    const price = incomes
      .filter((income) => income.training_id.training === training)
      .map((income) => income.price)
      .reduce((acc, cur) => acc + cur, 0)
    incomesPieChartOptions.push({ label: training, number: price })
  })

  return { incomesPieChartOptions, incomesData }
}
