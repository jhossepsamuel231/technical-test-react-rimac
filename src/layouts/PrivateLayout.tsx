import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

export default function PrivateLayout() {
  return (
    <>
      <Navbar />
      <main id="main" role="main" aria-label="Contenido principal">
        <Outlet />
      </main>
    </>
  )
}
