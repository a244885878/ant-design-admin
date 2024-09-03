import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import useStore from '@/store'
import router from '@/router'
import PageLoading from "./components/PageLoading";

const App: React.FC = () => {

  const { pageLoading } = useStore()
  const [loading, setLoading] = useState(pageLoading)

  useEffect(() => {
    setLoading(pageLoading)
  }, [pageLoading])

  if (loading) {
    return <PageLoading></PageLoading>
  }

  return (
    <RouterProvider router={router} />
  );
};

export default App;