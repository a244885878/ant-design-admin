import styles from './index.module.scss'
import Menu from './Menu/index'
import { Outlet } from 'react-router-dom'
import useGuard from '@/hooks/useGuard'
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react'
import useStore from '@/store'
import { Dropdown, Avatar, type MenuProps } from 'antd';
import { systemTitle } from '@/utils/config';

export default function Layout() {

  useGuard()

  const { userInfo } = useStore()

  const navigate = useNavigate()

  const handleLogout = () => {
    startTransition(() => {
      localStorage.removeItem('token')
      navigate('/login')
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" onClick={handleLogout}>
          退出登录
        </a>
      ),
    },
  ];

  if (!localStorage.getItem('token')) {
    return null
  }

  return (
    <div className={styles['main-box']}>
      <div className={styles['nav-box']}>
        <div className={styles['logo-box']}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          <span>{systemTitle}</span>
        </div>
        <Dropdown menu={{ items }}>
          <div className={styles['user-info-box']}>
            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            <span style={{ marginLeft: '10px' }}>{userInfo.name}</span>
          </div>
        </Dropdown>
      </div>
      <div className={styles.sidebar}>
        <div className={styles['menu-box']}>
          <Menu></Menu>
        </div>
      </div>
      <div className={styles['rg-box']}>
        <div className={styles['content-box']}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}