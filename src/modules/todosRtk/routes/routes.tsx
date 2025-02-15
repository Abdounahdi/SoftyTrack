/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteProps } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import MainLayout from '../../shared/layout/MainLayout/MainLayout'
import { PATH } from './paths'
// import AuthGuard from '../../shared/guards/AuthGuard'

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
    // guard: AuthGuard,
    path: PATH.TODOS,
    component: lazy(() => import('../features/TodoList/TodoList')),
    layout: MainLayout,
  },
  {
    exact: true,
    // guard: AuthGuard,
    path: PATH.TODOS_CREATE,
    component: lazy(() => import('../features/TodoCreateEdit/TodoCreateEdit')),
    layout: MainLayout,
  },
  {
    exact: true,
    // guard: AuthGuard,
    path: PATH.TODOS_EDIT,
    component: lazy(() => import('../features/TodoCreateEdit/TodoCreateEdit')),
    layout: MainLayout,
  },
]

export default routes
