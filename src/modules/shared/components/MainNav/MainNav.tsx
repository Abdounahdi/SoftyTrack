// import { ReactElement } from 'react'

import { NavLink } from 'react-router'

// interface Props {
//   options:
// }

// interface Options {
//   name: string
//   icon: ReactElement
// }

export default function MainNav({ options }) {
  return (
    <ul className="side_bar_nav">
      {options.length ? (
        options.map((option) => (
          <NavLink className="side_bar_nav_route" to={option.to} key={option.to}>
            {option.icon}
            {option.name}
          </NavLink>
        ))
      ) : (
        <li>no pages to show</li>
      )}
    </ul>
  )
}
