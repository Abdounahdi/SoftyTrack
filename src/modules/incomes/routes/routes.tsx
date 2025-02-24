/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import MainLayout from '../../shared/layout/MainLayout/MainLayout'
import AuthGuard from '../../shared/guards/AuthGuard'
// import GuestGuard from '../../shared/guards/GuestGuard'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: '/incomes',
    component: lazy(() => import('../features/Incomes/Incomes')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/incomes/create',
    component: lazy(() => import('../features/IncomesCreate/IncomesCreate')),
    layout: MainLayout,
  },
]

export default routes
