// import { ReactSVG } from 'react-svg'
import LogoSvg from "../../assets/icons/BrandLogo.svg";

// const LogoSvg = () => <ReactSVG src="../../assets/icons/BrandLogo" />

export default function Logo() {
  return (
    <div className="logo_container">
      <img src={LogoSvg} alt="" />
    </div>
  )
}
 