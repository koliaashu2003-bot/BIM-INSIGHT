import { lazy, Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

const Scene3D = lazy(() => import('./Scene3D').then((m) => ({ default: m.Scene3D })))

export function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-shell">
      <div className="scene3d-wrap" aria-hidden="true">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      <NavBar />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
