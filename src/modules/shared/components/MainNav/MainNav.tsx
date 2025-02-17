import { ReactElement } from 'react'
import { NavLink } from 'react-router'

interface Props {
  options: Options[]
  isOpen: boolean
}

interface Options {
  name: string
  icon: ReactElement
  to: string
}

export default function MainNav({ options, isOpen }: Props) {
  return (
    <ul className="side_bar_nav">
      {options.length ? (
        options.map((option) => (
          <NavLink
            className={`side_bar_nav_route ${isOpen ? 'side_bar_nav_route_opened' : 'side_bar_nav_route_closed'}`}
            to={option.to}
            key={option.to}
          >
            {option.icon}
            <p className={`${isOpen ? "nav_title_show" : "nav_title_hide"}`}>{option.name}</p>
          </NavLink>
        ))
      ) : (
        <li>no pages to show</li>
      )}
    </ul>
  )
}
