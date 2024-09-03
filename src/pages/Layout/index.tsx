import styles from './index.module.scss'
import Menu from './Menu/index'
import { Outlet } from 'react-router-dom'
import useGuard from '@/hooks/useGuard'
import { useNavigate } from 'react-router-dom';
import { startTransition, useState } from 'react'
import useStore from '@/store'
import { Dropdown, Avatar, type MenuProps, Button } from 'antd';
import { systemTitle } from '@/utils/config';
import { LeftOutlined } from '@ant-design/icons'

export default function Layout() {

  useGuard()

  const { userInfo, menus } = useStore()
  const navigate = useNavigate()
  const [isFold, setFold] = useState(false)

  const handleLogout = () => {
    startTransition(() => {
      localStorage.removeItem('token')
      navigate('/login')
    })
  }

  const handleFold = () => {
    setFold(!isFold)
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

  if (!menus?.length) {
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
      <div className={styles.sidebar} style={{ width: isFold ? '80px' : '256px' }}>
        <Button onClick={() => handleFold()} className={[styles['fold-button'], isFold ? styles['is-fold'] : ''].join(' ')}
          size='small' shape="circle" icon={<LeftOutlined style={{ fontSize: '12px', color: '#ddd' }} />} />
        <div className={styles['menu-box']}>
          <Menu isFold={isFold}></Menu>
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