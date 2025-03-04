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
    path: PATH.EXPENSES,
    component: lazy(() => import('../features/Expenses/Expenses')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.EXPENSES_CREATE,
    component: lazy(() => import('../features/ExpenseCreate/ExpenseCreate')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.EXPENSES_EDIT,
    component: lazy(() => import('../features/ExpenseUpdate/ExpenseUpdate')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.EXPENSES_VIEW,
    component: lazy(() => import('../features/ExpenseView/ExpenseView')),
    layout: MainLayout,
  },
]

export default routes
