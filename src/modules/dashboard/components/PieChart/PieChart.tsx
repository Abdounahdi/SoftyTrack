import Card from '../Card/Card'
import Chart from 'react-apexcharts'
import chroma from 'chroma-js'

export default function PieChart({ title, options }) {
  //
  const generateColors = (count) => chroma.scale(['#2E71E2', '#28d997']).colors(count)
  const colors = generateColors(5)

  const labels = options.map((option) => option.label)

  const numbers = options.map((option) => option.number)
  const total = numbers.reduce((acc, cur) => acc + cur, 0)
  

  return (
    <Card className="pie_chart_container">
      <h2 className="pie_chart_title">{title}</h2>
      <DonutChart colors={colors} labels={labels} numbers={numbers} />
    </Card>
  )
}

const DonutChart = ({ colors, labels, numbers }) => {
  const series = numbers

  const options = {
    chart: {
      type: 'donut',
    },
    labels: labels || ['Beginner', 'Intermediate', 'Advanced'],
    colors: colors, // Green, Blue, Orange
    legend: {
      show: true,
      position: 'bottom',
    },
    dataLabels: {
      enabled: false,
      formatter: (val) => `${val.toFixed(1)}%`, // Show percentage
      style: {
        colors: ['#FFFFFF'], // White text inside chart
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val.toFixed(0)}`, // Show values in tooltip
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Controls inner white space
        },
      },
    },
  }

  return <Chart options={options} series={series} type="donut" height={300} />
}
