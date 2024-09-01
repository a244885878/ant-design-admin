import { createBrowserRouter } from 'react-router-dom'
import { createElement, lazy } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: createElement(lazy(() => import('@/pages/Layout/index'))),
    children: [],
  },
  {
    path: '/login',
    element: createElement(lazy(() => import('@/pages/Login/index'))),
  },
  {
    path: '*',
    element: createElement(lazy(() => import('@/pages/Error/404'))),
  },
]);

export default router
