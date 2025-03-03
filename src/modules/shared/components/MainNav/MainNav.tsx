// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// @ts-nocheck

import { ReactElement } from 'react'
import { NavLink } from 'react-router'
import { useAppSelector } from '../../store'

interface Props {
  options: Options[]
  isOpen: boolean
}

interface Options {
  name: string
  icon: ReactElement
  to: string
  guard: string
}

export default function MainNav({ options, isOpen }: Props) {
  const { role } = useAppSelector((state) => state.auth)
  return (
    <ul className="side_bar_nav">
      {options.length ? (
        options.map((option) => {
          if (!option.guard.includes(role)) return <></>
          return (
            <NavLink
              className={`side_bar_nav_route ${isOpen ? 'side_bar_nav_route_opened' : 'side_bar_nav_route_closed'}`}
              to={option.to}
              key={option.to}
            >
              {option.icon}
              <p className={`${isOpen ? 'nav_title_show' : 'nav_title_hide'}`}>{option.name}</p>
            </NavLink>
          )
        })
      ) : (
        <li>no pages to show</li>
      )}
    </ul>
  )
}
