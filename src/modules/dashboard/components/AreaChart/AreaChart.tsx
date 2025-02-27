export default function AreaChart({ areaChartOptions, firstTitle, secondTitle }) {
  console.log(areaChartOptions)

  const firstTitleData = areaChartOptions.map((option) => option[firstTitle.toLowerCase()])
  const secondTitleData = areaChartOptions.map((option) => option[secondTitle.toLowerCase()])
  const series = [
    {
      name: firstTitle,
      data: firstTitleData, // Sample data for courses
    },
    {
      name: secondTitle,
      data: secondTitleData, // Sample data for training camps
    },
  ]
  return (
    <div className="area_chart_container">
      <AreaChartChart series={series}/>
    </div>
  )
}

import Chart from 'react-apexcharts'

const AreaChartChart = ({series }) => {

  const options = {
    chart: {
      type: 'area',
      zoom: { enabled: true },
    },
    colors: ['#007bff', '#28d997'], // Blue & Green
    dataLabels: { enabled: false }, // No number labels on data points
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    markers: { size: 5 },
    tooltip: {
      shared: true,
      y: {
        formatter: (val) => `${val}`, // Tooltip value format
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      position: 'bottom',
    },
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Revenue</h2>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  )
}
