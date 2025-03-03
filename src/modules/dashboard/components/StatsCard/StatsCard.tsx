// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { currencyFormat } from '../../../shared/utils/helpers'

import Card from '../Card/Card'

export default function StatsCard({ statsObj }) {
  return (
    <Card className={'stats_card'}>
      <div className="stats_text_details">
        <p className="stats_label">{statsObj.label}</p>
        <p className="stats_value">{currencyFormat(statsObj.value)}</p>
      </div>

      <span className="stats_icon" style={{ color: statsObj.color }}>
        {statsObj.icon}
      </span>
    </Card>
  )
}
