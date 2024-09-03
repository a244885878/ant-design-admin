import { useEffect, createElement, lazy, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '@/store'
import { type RouteObject, Navigate } from 'react-router-dom'
import router from '@/router';
import NProgress from 'nprogress'
import * as Icons from '@ant-design/icons';

const whiteList = ['/login']

const menus: RouteObject & { [key: string]: any }[] = [
  {
    path: '/',
    key: '/',
    label: '首页',
    icon: 'HomeOutlined',
    element: 'Home/index',
  },
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
      },
    ]
  },
]

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
  const { menus, setMenus, setPageLoading } = useStore()

  useEffect(() => {

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
            // 递归查找路由，不存在重定向到404
            if (location.pathname === '/404') {
              navigate('/404', { replace: true })
            }
            setPageLoading(false)
          }
        }
      } else {
        if (!whiteList.includes(location.pathname)) {
          navigate('/login', { replace: true })
        }
      }

      NProgress.done()
    }
    asyncFn()
  }, [location]);

};

export default useGuard;
