import React from "react";
import useGuard from '@/hooks/useGuard'
import useStore from '@/store'
import { Button, Form, Input, type FormProps } from 'antd';
import styles from './index.module.scss'
import { systemTitle } from "@/utils/config";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { navigateRoute } from '@/utils/tools'

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC = () => {

  useGuard()

  const { removeTokenRoute } = useStore()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values)
    // 登录之前先清空动态路由表和token
    removeTokenRoute()
    localStorage.setItem('token', '123')
    navigateRoute('/', { replace: true })
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