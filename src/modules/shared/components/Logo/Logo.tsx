// import { ReactSVG } from 'react-svg'
import LogoSvgLG from '../../assets/icons/BrandLogo.svg'
import LogoSvgSM from '../../assets/icons/brandLogoSmall.svg'

// const LogoSvg = () => <ReactSVG src="../../assets/icons/BrandLogo" />

interface Props {
  isOpen: boolean
}

export default function Logo({ isOpen }: Props) {
  return (
    <div className="logo_container">
      <img src={isOpen ? LogoSvgLG : LogoSvgSM} alt="" />
    </div>
  )
}
