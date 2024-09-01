import { create } from 'zustand';
import { type RouteObject } from 'react-router-dom';

interface StoreState {
  menus: RouteObject[],
  setMenus: (menus: RouteObject[]) => void
  pageLoading: boolean
  setPageLoading: (val: boolean) => void
}

const useStore = create<StoreState>((set) => ({
  menus: [],
  setMenus: (menus) => set(() => ({ menus })),
  pageLoading: false,
  setPageLoading: (pageLoading) => set(() => ({ pageLoading }))
}));

export default useStore;
