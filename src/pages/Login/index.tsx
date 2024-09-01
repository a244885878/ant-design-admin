import React, { ChangeEvent, startTransition } from "react";
import useGuard from '@/utils/useGuard'
import useSuperState from "@/hooks/useSuperState";
import { useNavigate } from 'react-router-dom';
import useStore from '@/store'

const Login: React.FC = () => {

  useGuard()

  const navigate = useNavigate()
  const { setMenus } = useStore()

  const [form, setForm] = useSuperState({
    username: '',
    password: ''
  })

  const formChange = (e: ChangeEvent<HTMLInputElement>, key: 'username' | 'password') => {
    form[key] = e.target.value
    setForm()
  }

  const handleLogin = () => {
    startTransition(() => {
      // 每次登录之前清空路由表
      setMenus([])
      localStorage.setItem('token', '123')
      navigate('/')
    })
  }

  return (
    <div>
      <h1>登录页</h1>
      <input type="text" value={form.username} onChange={(e) => formChange(e, 'username')} />
      <input type="password" value={form.password} onChange={(e) => formChange(e, 'password')} />
      <button onClick={() => handleLogin()}>登录</button>
    </div>
  )
};

export default Login;