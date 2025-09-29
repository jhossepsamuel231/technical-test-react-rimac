import { createBrowserRouter, Navigate } from 'react-router-dom'
import RequireSession from './guards/RequireSession'
import RequireSelectedPlan from './guards/RequireSelectedPlan'
import { lazy, Suspense } from 'react'
import PublicLayout from '@/layouts/PublicLayout'
import PrivateLayout from '@/layouts/PrivateLayout'
import Loader from '@/components/router/Loader'

const LoginPage = lazy(() => import('@/pages/login/LoginPage'))
const PlansPage = lazy(() => import('@/pages/plans/PlansPage'))
const SummaryPage = lazy(() => import('@/pages/summary/SummaryPage'))

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },

  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: <PrivateLayout />,
    children: [
      {
        path: '/planes',
        element: (
          <RequireSession>
            <Suspense fallback={<Loader />}>
              <PlansPage />
            </Suspense>
          </RequireSession>
        ),
      },
      {
        path: '/resumen',
        element: (
          <RequireSelectedPlan>
            <Suspense fallback={<Loader />}>
              <SummaryPage />
            </Suspense>
          </RequireSelectedPlan>
        ),
      },
    ],
  },

  { path: '*', element: <Navigate to="/login" replace /> },
])
