import styles from './index.module.scss'
import Menu from './Menu/index'
import { Outlet } from 'react-router-dom'
import useGuard from '@/utils/useGuard'
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react'
import useStore from '@/store'


export default function Layout() {

  useGuard()

  const { menus } = useStore()

  const navigate = useNavigate()

  const handleLogout = () => {
    startTransition(() => {
      localStorage.removeItem('token')
      navigate('/login')
    })
  }

  return (
    <div className={styles['main-box']}>
      <div className={styles.sidebar}>
        <h3>XXX管理系统</h3>
        <div className={styles['menu-box']}>
          <Menu routes={menus}></Menu>
        </div>
      </div>
      <div className={styles['content-box']}>
        <div className={styles['nav-box']} onClick={handleLogout}>退出登录</div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}