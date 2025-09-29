import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { SessionProvider } from './hooks/useSession'

export default function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}
