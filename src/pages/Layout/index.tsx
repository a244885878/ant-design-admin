import styles from './index.module.scss'
import Menu from './Menu/index'
import { Outlet } from 'react-router-dom'
import useGuard from '@/hooks/useGuard'
import { useNavigate } from 'react-router-dom';
import { startTransition, useState, useEffect, useRef } from 'react'
import useStore from '@/store'
import { Dropdown, Avatar, type MenuProps, Button } from 'antd';
import { systemTitle } from '@/utils/config';
import { LeftOutlined, MenuOutlined } from '@ant-design/icons'
import DrawerMenu from './DrawerMenu'

export default function Layout() {

  useGuard()

  const { userInfo, menus } = useStore()
  const navigate = useNavigate()
  const [isFold, setFold] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false)
  const foldFlag = useRef(false)

  const handleLogout = () => {
    startTransition(() => {
      localStorage.removeItem('token')
      navigate('/login')
    })
  }

  const handleFold = () => {
    setFold(!isFold)
    if (!isFold) {
      foldFlag.current = true
    }
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

  // 根据页面宽度动态显示页面效果
  const widthConfig = {
    mid: 992,
    small: 768
  }

  const setSidebarWidth = () => {
    if (!showMenu) {
      return '0'
    }
    if (isFold) {
      return '80px'
    }
    return '256px'
  }

  useEffect(() => {
    const change = () => {
      const { clientWidth } = document.documentElement
      // mid-折叠菜单
      if (clientWidth <= widthConfig.mid) {
        setFold(true)
        foldFlag.current = false
      } else {
        if (!foldFlag.current) {
          setFold(false)
        }
      }
      // small-隐藏菜单
      if (clientWidth <= widthConfig.small) {
        setShowMenu(false)
      } else {
        setShowMenu(true)
        setOpenDrawerMenu(false)
      }
    }
    change()
    window.addEventListener('resize', change)
  }, [])

  if (!menus?.length) {
    return null
  }

  return (
    <div className={styles['main-box']}>
      <div className={styles['nav-box']}>
        <div className={styles['logo-box']}>
          {
            !showMenu ? <MenuOutlined style={{ fontSize: '18px', marginRight: '16px', cursor: 'pointer' }} onClick={() => setOpenDrawerMenu(true)} /> : null
          }
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          {
            showMenu ? <span>{systemTitle}</span> : null
          }
        </div>
        <Dropdown menu={{ items }}>
          <div className={styles['user-info-box']}>
            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            <span style={{ marginLeft: '10px' }}>{userInfo.name}</span>
          </div>
        </Dropdown>
      </div>
      <div className={styles.sidebar} style={{ width: setSidebarWidth(), borderRight: !showMenu ? 'none' : '' }}>
        <Button onClick={() => handleFold()} className={[styles['fold-button'], isFold ? styles['is-fold'] : ''].join(' ')}
          size='small' shape="circle" icon={<LeftOutlined style={{ fontSize: '12px', color: '#ddd' }} />} style={{ display: !showMenu ? 'none' : '' }} />
        <div className={styles['menu-box']}>
          <Menu isFold={isFold}></Menu>
        </div>
      </div>
      <div className={styles['rg-box']}>
        <div className={styles['content-box']}>
          <Outlet></Outlet>
        </div>
      </div>
      <DrawerMenu open={openDrawerMenu} onClose={() => { setOpenDrawerMenu(false) }} />
    </div>
  )
}