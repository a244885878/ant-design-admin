import { useNavigate, useLocation } from 'react-router-dom'
import { startTransition, useEffect, useState } from 'react'
import { Menu, type MenuProps, ConfigProvider } from 'antd';
import useStore from '@/store'

export default function MenuFc({ isFold }: { isFold: boolean }) {

  type MenuItem = Required<MenuProps>['items'][number];

  const navigate = useNavigate()
  const location = useLocation()
  const { menus } = useStore()
  const [items, setItems] = useState<MenuItem[]>([])

  // 过滤路由表中重定向的子项
  function removeIndexRoutes(menus: any[]): MenuItem[] {
    return menus
      .filter(menu => !menu.index && !menu.hidden)
      .map(menu => ({
        ...menu,
        children: menu.children ? removeIndexRoutes(menu.children) : undefined
      }));
  }

  // 查找当前路由所有的父级路由(用于展开菜单)
  function getOpenKeysFromPath(pathname: string): string[] {
    const openKeys: string[] = [];

    const findKey = (items: any[], path: string) => {
      for (const item of items) {
        if (item.path === path) {
          if (item.children) {
            openKeys.push(item.key);
          }
          return true;
        }
        if (item.children) {
          if (findKey(item.children, path)) {
            openKeys.push(item.key);
            return true;
          }
        }
      }
      return false;
    };

    findKey(menus, pathname);
    return openKeys.reverse();
  }

  useEffect(() => {
    setItems(removeIndexRoutes(menus))
  }, [])

  const handleItem = (v: MenuItem) => {
    if (v!.key === location.pathname) return
    startTransition(() => {
      navigate(v!.key as string)
    })
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: 'transparent',
            activeBarBorderWidth: 0,
            subMenuItemBg: 'transparent'
          },
        },
      }}
    >
      <Menu
        onClick={handleItem}
        style={{ width: '100%', height: '100%' }}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={getOpenKeysFromPath(location.pathname)}
        mode="inline"
        items={items}
        inlineCollapsed={isFold}
      />
    </ConfigProvider>
  )
}