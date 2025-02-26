import React from 'react'

export default function AreaChart() {
  return (
    <div className="area_chart_container">
      <AreaChartChart />
    </div>
  )
}

import Chart from 'react-apexcharts'

const AreaChartChart = () => {
  const series = [
    {
      name: 'Courses Revenue',
      data: [20, 5, 0, 0, 0, 0, 0, 0, 0, 10, 15, 25], // Sample data for courses
    },
    {
      name: 'Training Camps Revenue',
      data: [30, 10, 0, 0, 0, 0, 0, 0, 110, 40, 20, 15], // Sample data for training camps
    },
  ]

  const options = {
    chart: {
      type: 'area',
      zoom: { enabled: false },
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
