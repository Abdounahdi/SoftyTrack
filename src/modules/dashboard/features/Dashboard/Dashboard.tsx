// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { useSearchParams } from 'react-router'
import { HiOutlineBanknotes, HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { TbPigMoney } from 'react-icons/tb'
import { Spin } from 'antd'

import { useGetExpensesByTimeQuery } from '../../../expenses/data/supabaseApi/expensesApi'
import { useGetIncomesByTimeQuery } from '../../../incomes/data/supabaseApi/incomesApi'

import LastTransactions from '../../components/LastTransactions/LastTransactions'
import PieChart from '../../components/PieChart/PieChart'
import AreaChart from '../../components/AreaChart/AreaChart'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import Stats from '../../components/Stats/Stats'

export default function Dashboard() {
  const [searchParams] = useSearchParams()

  const when = searchParams.get('filter-by-time')

  const minus = when === 'Last Month' ? 30 : when === 'Last 3 Months' ? 90 : 365
  const { data: incomes, isFetching: isLoadingIncomes } = useGetIncomesByTimeQuery({ minus })
  const { data: expensesInfo, isFetching: isLoadingExpenses } = useGetExpensesByTimeQuery({ minus })
  const isLoading = isLoadingIncomes || isLoadingExpenses

  if (isLoading) return <Spin />

  const { data: expenses, count: expensesCount } = expensesInfo

  const totalIncomesPrice = incomes
    ?.map((income) => income?.price)
    .reduce((acc, cur) => acc + cur, 0)
  const totalExpensesPrice = expenses
    ?.map((expense) => expense.price)
    .reduce((acc, cur) => acc + cur, 0)

  const stats = [
    {
      label: 'Total Incomes',
      value: totalIncomesPrice,
      icon: <HiOutlineBanknotes />,
      color: '#2E71E2',
    },
    {
      label: 'Total Expenses',
      value: totalExpensesPrice,
      icon: <HiOutlineCurrencyDollar />,
      color: '#2BA5BD',
    },
    {
      label: 'Total Revenus',
      value: totalIncomesPrice - totalExpensesPrice,
      icon: <TbPigMoney />,
      color: '#28d997',
    },
  ]
  const { incomesData, incomesPieChartOptions } = incomesDashboardData(incomes)

  const { expensesData, expensesPieChartOptions } = expensesDashboardData(expenses)

  const monthlyIncomes = getMonthlyData(incomes)
  const monthlyExpenses = getMonthlyData(expenses)

  const allMonths = [
    ...new Set([...Object.keys(monthlyIncomes), ...Object.keys(monthlyExpenses)]),
  ].sort()

  const areaChartOptions = allMonths.map((month) => {
    return {
      category: month,
      incomes: monthlyIncomes[month] || 0,
      expenses: monthlyExpenses[month] || 0,
    }
  })

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
          <PieChart title="Expense" options={expensesPieChartOptions} />
          <LastTransactions title="Last Expenses" viewPath="/expenses" data={expensesData} />
        </div>
        <div className="summary_container">
          <AreaChart
            areaChartOptions={areaChartOptions}
            firstTitle={'Incomes'}
            secondTitle={'Expenses'}
          />
        </div>
      </div>
    </>
  )
}

function incomesDashboardData(incomes) {
  const incomesPieChartOptions = []

  const incomesData = incomes
    ?.map((income) => {
      return {
        key: income?.id,
        training: income?.training_id.training,
        price: income?.price,
        slicesPrecentage: ` ${income?.total_slices}-${income?.paid_slices} `,
        customerName: income?.customer_id?.full_name,
      }
    })
    .slice(0, 5)

  const incomesTrainings = new Set()
  incomes?.map((income) => incomesTrainings.add(income.training_id.training))

  incomesTrainings.forEach((training) => {
    const price = incomes
      ?.filter((income) => income?.training_id.training === training)
      .map((income) => income.price)
      .reduce((acc, cur) => acc + cur, 0)
    incomesPieChartOptions.push({ label: training, number: price })
  })

  return { incomesPieChartOptions, incomesData }
}

function expensesDashboardData(expenses) {
  const expensesData = expenses
    .map((expense) => {
      console.log(expense)
      return {
        key: expense.id,
        category: expense.category_id.category,
        price: expense.price,
        employeeName: expense?.user_id?.full_name,
      }
    })
    .slice(0, 5)

  const expensesPieChartOptions = []

  const expensesCategories = new Set()
  expenses.map((expenses) => expensesCategories.add(expenses.category_id.category))

  expensesCategories.forEach((category) => {
    const price = expenses
      .filter((expenses) => expenses.category_id.category === category)
      .map((expenses) => expenses.price)
      .reduce((acc, cur) => acc + cur, 0)
    expensesPieChartOptions.push({ label: category, number: price })
  })

  return { expensesPieChartOptions, expensesData }
}

const getMonthlyData = (data) => {
  return data.reduce((acc, item) => {
    const date = new Date(item.date_created)
    const month = date.toISOString().slice(0, 7) // Get short month name

    if (!acc[month]) {
      acc[month] = 0
    }
    acc[month] += item.price

    return acc
  }, {})
}
