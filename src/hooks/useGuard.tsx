import { useEffect, createElement, lazy, type ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '@/store'
import { type RouteObject, Navigate } from 'react-router-dom'
import router from '@/router';
import NProgress from 'nprogress'

const whiteList = ['/login']

const menus: RouteObject[] = [
  {
    path: '/',
    element: 'Home/index',
    handle: {
      title: '首页'
    },
  },
  {
    id: 'about',
    path: '/about',
    element: 'About/index',
    handle: {
      title: '关于',
    },
    children: [
      {
        id: 'about-redirect',
        path: '',
        index: true,
        element: '/about/news',
      },
      {
        path: '/about/news',
        element: 'About/News/index',
        handle: {
          title: '新闻页'
        },
      },
      {
        path: '/about/games',
        element: 'About/Games/index',
        handle: {
          title: '游戏资讯'
        },
      },
    ]
  }
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
const setDynamicViews = (menus: RouteObject[]) => {
  menus.forEach((v: RouteObject) => {
    if (!v.index) {
      const importModule = modules[`/src/views/${v.element}.tsx`];
      v.element = createElement(lazy(() => importModule() as Promise<{ default: ComponentType }>));
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
