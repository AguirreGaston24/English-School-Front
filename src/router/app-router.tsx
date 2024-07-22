import { Route, Routes } from 'react-router-dom'

import { PublicRoute } from './public-routes'
import { PrivateRoute } from './private-route'
import { LoginScreen } from '../screens/auth'
import { MainLayout } from '../components/layout'
import { DashboardRouter } from './dashboard-router'
import { RegisterScreen } from '../screens/auth/register-screen'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainLayout>
              <DashboardRouter />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
