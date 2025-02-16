import { useNavigate } from 'react-router'
import ArrowLeft from '../../assets/icons/arrowLeft.svg'

interface Props {
  title: string
}

export default function PageHeading({ title }: Props) {
  const navigate = useNavigate()
  return (
    <div className="page_heading_title_container">
      <button onClick={() => navigate(-1)}>
        <img src={ArrowLeft} alt="click to go back" />
      </button>
      <h1>{title}</h1>
    </div>
  )
}
