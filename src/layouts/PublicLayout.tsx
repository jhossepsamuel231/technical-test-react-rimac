// PublicLayout.tsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import './PublicLayout.scss'

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <div className="pageGradients" aria-hidden="true" />
      <main id="main" role="main" aria-label="Contenido principal">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
