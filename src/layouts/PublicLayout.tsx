import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main id="main" role="main" aria-label="Contenido principal">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
