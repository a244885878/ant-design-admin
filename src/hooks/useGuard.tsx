import { useEffect, createElement, lazy, type ComponentType } from 'react';
import { useLocation, useNavigate, type RouteObject, Navigate } from 'react-router-dom';
import useStore, { type TiledMenus } from '@/store'
import router from '@/router';
import NProgress from 'nprogress'
import * as Icons from '@ant-design/icons';
import { systemTitle } from '@/utils/config'

const whiteList = ['/login']

/*
  index:重定向路由、hidden:不在菜单显示的路由
*/
const homeRoute = {
  path: '/',
  key: '/',
  label: '首页',
  icon: 'HomeOutlined',
  element: 'Home/index',
}
const route404 = {
  id: '404',
  path: '/404',
  key: '/404',
  label: '404',
  element: 'Error/Page404',
  hidden: true
}
const redirect404 = {
  id: 'redirect404',
  path: '*',
  element: 'Error/Page404',
  hidden: true
}
const menus: RouteObject & { [key: string]: any }[] = [
  homeRoute,
  {
    id: 'about',
    path: '/about',
    key: '/about',
    label: '关于',
    icon: 'CoffeeOutlined',
    element: 'About/index',
    children: [
      {
        id: 'about-redirect',
        path: '',
        key: '',
        index: true,
        element: '/about/news',
      },
      {
        path: '/about/news',
        key: '/about/news',
        label: '新闻页',
        element: 'About/News/index',
      },
      {
        path: '/about/games',
        key: '/about/games',
        label: '游戏资讯',
        element: 'About/Games/index',
      }
    ]
  },
  route404,
  redirect404
]
// 记录平铺的菜单数据(用于比较路由)
const recordTiledMenus: TiledMenus = []

// 模拟后端返回
const getMenus = () => {
  console.log("获取菜单")
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(menus)
    }, 500)
  })
}

// 递归过滤菜单
const modules = import.meta.glob('@/views/**/*.tsx');
type Menus = RouteObject & { [key: string]: any }
const setDynamicViews = (menus: Menus[]) => {
  menus.forEach((v: Menus) => {
    if (!v.index) {
      const importModule = modules[`/src/views/${v.element}.tsx`];
      v.element = createElement(lazy(() => importModule() as Promise<{ default: ComponentType }>));
      if (v.icon) {
        v.icon = createElement((Icons as any)[v.icon])
      }
      recordTiledMenus.push({
        path: v.path!,
        label: v.label
      })
    } else {
      v.element = <Navigate to={v.element as string} replace />
    }
    if (v.children?.length) {
      setDynamicViews(v.children)
    }
  })
  return menus
}

const useGuard = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { menus, setMenus, setPageLoading, setTiledMenus, tiledMenus } = useStore()

  useEffect(() => {
    NProgress.start()

    const asyncFn = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        if (location.pathname === '/login') {
          navigate('/', { replace: true })
        } else {
          // 获取路由表(仅获取一次)
          if (!menus?.length) {
            setPageLoading(true)
            const res = await getMenus()
            const newMenus = setDynamicViews(JSON.parse(JSON.stringify(res)))
            router.routes[0].children = newMenus as any[]
            setMenus(newMenus)
            setTiledMenus(recordTiledMenus)
            setPageLoading(false)
          }
        }
      } else {
        if (!whiteList.includes(location.pathname)) {
          navigate('/login', { replace: true })
        }
      }
      // title设置
      if (location.pathname === '/login') {
        document.title = `登录 - ${systemTitle}`
      } else {
        const currentRoute = tiledMenus.find(v => v.path === location.pathname)
        document.title = `${currentRoute?.label ?? '404'} - ${systemTitle}`
      }
      NProgress.done()
    }
    asyncFn()
  }, [location]);

};

export default useGuard;
