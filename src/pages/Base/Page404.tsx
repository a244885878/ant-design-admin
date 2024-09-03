import React from "react";
import useGuard from '@/hooks/useGuard'

const Page404: React.FC = () => {

  useGuard()

  return (
    <h1>404</h1>
  )
};

export default Page404;