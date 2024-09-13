import { startTransition } from 'react'
import { type NavigateOptions } from 'react-router-dom';
import NProgress from 'nprogress'
import router from '@/router'

// 公共跳转路由方法
export const navigateRoute = (path: string, options?: NavigateOptions) => {

  const { navigate } = router

  NProgress.start()
  startTransition(() => {
    navigate(path, options)
  })

}