// src/routes/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import RequireSession from './guards/RequireSession'
import RequireSelectedPlan from './guards/RequireSelectedPlan'
import { lazy, Suspense } from 'react'
import PublicLayout from '@/layouts/PublicLayout'
import PrivateLayout from '@/layouts/PrivateLayout'
import Loader from '@/components/router/Loader'

type Page = React.ComponentType<Record<string, never>>
const lazyPage = (loader: () => Promise<{ default: Page }>) => lazy(loader)

const LoginPage = lazyPage(() => import('@/pages/login/LoginPage') as Promise<{ default: Page }>)
const PlansPage = lazyPage(() => import('@/pages/plans/PlansPage') as Promise<{ default: Page }>)
const SummaryPage = lazyPage(
  () => import('@/pages/summary/SummaryPage') as Promise<{ default: Page }>,
)

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
