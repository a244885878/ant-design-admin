import { type RouteObject, useNavigate, useLocation } from 'react-router-dom'
import { startTransition, Fragment } from 'react'
import NProgress from 'nprogress'

export default function Menu({ routes }: { routes: RouteObject[] }) {

  const navigate = useNavigate()
  const location = useLocation()

  const handleItem = (v: RouteObject) => {
    if (v.path === location.pathname) return
    NProgress.start()
    startTransition(() => {
      navigate(v.path!)
    })
  }

  return (
    <ul style={{ paddingLeft: '10px' }}>
      {
        routes.map((v: RouteObject) => {
          if (v.children?.length) {
            return (
              <Fragment key={v.path}>
                <li onClick={() => handleItem(v)}>{v.handle.title}</li>
                <Menu routes={v.children}></Menu>
              </Fragment>
            )
          }
          return <li onClick={() => handleItem(v)} key={v.path}>{v.handle?.title}</li>
        })
      }
    </ul>
  )
}