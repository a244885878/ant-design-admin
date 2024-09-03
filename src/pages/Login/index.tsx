import React, { startTransition } from "react";
import useGuard from '@/hooks/useGuard'
import { useNavigate } from 'react-router-dom';
import useStore from '@/store'
import { Button, Form, Input, type FormProps, message } from 'antd';
import styles from './index.module.scss'
import { systemTitle } from "@/utils/config";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {

  useGuard()

  const navigate = useNavigate()
  const { setMenus } = useStore()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values)
    message.success('登录成功')
    startTransition(() => {
      // 每次登录之前清空路由表
      setMenus([])
      localStorage.setItem('token', '123')
      navigate('/')
    })
  }

  if (localStorage.getItem('token')) {
    return null
  }

  return (
    <>
      <div className={styles['login-page']}>
        <div className={styles['login-box']}>
          <h1>{systemTitle}</h1>
          <Form
            className={styles.form}
            onFinish={onFinish}
            style={{ width: '100%' }}
          >
            <Form.Item<FieldType>
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item style={{ width: '100%' }}>
              <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
};

export default Login;