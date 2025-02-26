/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import MainLayout from '../../shared/layout/MainLayout/MainLayout'
import AuthGuard from '../../shared/guards/AuthGuard'
import { PATH } from './paths'
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
    path: PATH.INCOMES,
    component: lazy(() => import('../features/Incomes/Incomes')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.INCOMES_CREATE,
    component: lazy(() => import('../features/IncomesCreate/IncomesCreate')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.INCOMES_EDIT,
    component: lazy(() => import('../features/IncomesUpdate/IncomesUpdate')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.INCOMES_VIEW,
    component: lazy(() => import('../features/IncomesView/IncomesView')),
    layout: MainLayout,
  },
]

export default routes
