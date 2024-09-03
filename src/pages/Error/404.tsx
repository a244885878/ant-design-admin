import React from "react";
import useGuard from '@/hooks/useGuard'

const Page404: React.FC = () => {

  useGuard()

  return (
    <div>
      <h1>404</h1>
    </div>
  )
};

export default Page404;