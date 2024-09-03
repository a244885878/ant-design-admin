import { Spin } from 'antd';

export default function PageLoading() {

  const styleObj = {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
  }

  return (
    <div style={styleObj}>
      <Spin size="large" />
    </div>
  )
}