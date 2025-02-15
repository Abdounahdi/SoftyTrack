import ThemeToggler from '../ThemeToggler/ThemeToggler'
import LanguageToggler from '../LanguageToggler/LanguageToggler'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { t } = useTranslation('translation')

  return (
    <div className="shared_navbar_toggler">
      <h3 className="shared_navbar_toggler_logo">{t('title')}</h3>

      <div>
        <Link to={'/todos'}>Redux Toolkit</Link>
        <span> | </span>
        <Link to={'/todos-rtk'}>RTK Query</Link>
      </div>

      <div className="shared_navbar_toggler_buttons">
        <ThemeToggler />
        <LanguageToggler />
      </div>
    </div>
  )
}

export default Navbar
