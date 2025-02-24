// import { ReactSVG } from 'react-svg'
import LogoSvgLG from '../../assets/icons/BrandLogo.svg'
import LogoSvgSM from '../../assets/icons/brandLogoSmall.svg'

// const LogoSvg = () => <ReactSVG src="../../assets/icons/BrandLogo" />

interface Props {
  isOpen: boolean
  className: string
}

export default function Logo({ isOpen, className }: Props) {
  return (
    <div className={`logo_container ${className}`}>
      <img src={isOpen ? LogoSvgLG : LogoSvgSM} alt="" />
    </div>
  )
}
