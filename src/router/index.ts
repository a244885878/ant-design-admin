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
    path: '/404',
    element: createElement(lazy(() => import('@/pages/Base/Page404'))),
  },
  {
    path: '*',
    element: createElement(lazy(() => import('@/pages/Base/PageSpace'))),
  },
]);

export default router
