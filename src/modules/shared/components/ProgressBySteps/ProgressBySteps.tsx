// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { Progress } from 'antd'

export default function ProgressBySteps({ slicesInfo }) {
  const [steps, paid] = slicesInfo.split('-')
  const precent = (paid * 100) / steps
  return (
    <Progress
      steps={steps}
      percent={precent}
      className="progress_bar_steps_slices_paid"
      showInfo={false}
    />
  )
}
