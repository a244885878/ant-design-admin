import { Drawer } from 'antd';
import Menu from '../Menu/index'
import styles from '../index.module.scss'

export default function DrawerMenu({ open, onClose }: { open: boolean, onClose: () => void }) {

  return (
    <Drawer styles={{ body: { padding: 0 } }} width={256} closeIcon={false} destroyOnClose={true} placement="left" open={open} onClose={onClose}>
      <div className={styles['menu-box']}>
        <Menu isFold={false}></Menu>
      </div>
    </Drawer>
  )
}