import React from "react";
import { Button, Empty, Typography } from 'antd';
import { navigateRoute } from '@/utils/tools'

const Page404: React.FC = () => {


  const styleObj = {
    width: '100%', height: '100%', display: 'flex', justifyContent: 'center'
  }

  const backHome = () => {
    navigateRoute('/', { replace: true })
  }

  return (
    <div style={styleObj}>
      <Empty
        style={{ height: '400px', marginTop: '50px' }}
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 200 }}
        description={
          <Typography.Text>
            <h2>404</h2>
            <span style={{
              marginTop: '10px', color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px'
            }}>抱歉，您访问的页面不存在。</span>
          </Typography.Text>
        }
      >
        <Button type="primary" onClick={backHome}>返回首页</Button>
      </Empty >
    </div >
  )
};

export default Page404;