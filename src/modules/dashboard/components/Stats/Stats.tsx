// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import StatsCard from '../StatsCard/StatsCard'

export default function Stats({ stats }) {
  return (
    <div className="stats_summary_container">
      {stats.map((option) => {
        return <StatsCard statsObj={option} key={option.label} />
      })}
    </div>
  )
}
