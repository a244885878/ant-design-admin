import { create } from 'zustand';
import { type RouteObject } from 'react-router-dom';

export type UserInfo = {
  name: string
}
export type TiledMenus = { path: string, label: string }[]
interface StoreState {
  menus: RouteObject[],
  setMenus: (menus: RouteObject[]) => void
  pageLoading: boolean
  setPageLoading: (val: boolean) => void
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
  tiledMenus: TiledMenus
  setTiledMenus: (tiledMenus: TiledMenus) => void
  // 清空token和路由的方法
  removeTokenRoute: () => void
}

const useStore = create<StoreState>((set) => ({
  menus: [],
  setMenus: (menus) => set({ menus }),
  pageLoading: false,
  setPageLoading: (pageLoading) => set({ pageLoading }),
  userInfo: {
    name: 'admin'
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  tiledMenus: [],
  setTiledMenus: (tiledMenus) => set({ tiledMenus }),
  removeTokenRoute: () => {
    localStorage.removeItem('token')
    set({
      menus: []
    })
  }
}));

export default useStore;
