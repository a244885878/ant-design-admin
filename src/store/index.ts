import { create } from 'zustand';
import { type RouteObject } from 'react-router-dom';

type UserInfo = {
  name: string
}
interface StoreState {
  menus: RouteObject[],
  setMenus: (menus: RouteObject[]) => void
  pageLoading: boolean
  setPageLoading: (val: boolean) => void
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
}

const useStore = create<StoreState>((set) => ({
  menus: [],
  setMenus: (menus) => set(() => ({ menus })),
  pageLoading: false,
  setPageLoading: (pageLoading) => set(() => ({ pageLoading })),
  userInfo: {
    name: 'admin'
  },
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
}));

export default useStore;
