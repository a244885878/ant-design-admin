import React, { startTransition } from "react";
import useGuard from '@/utils/useGuard'
import { useNavigate } from 'react-router-dom';
import useStore from '@/store'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

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
    startTransition(() => {
      // 每次登录之前清空路由表
      setMenus([])
      localStorage.setItem('token', '123')
      navigate('/')
    })
  }

  return (
    <Form
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入" />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Login;