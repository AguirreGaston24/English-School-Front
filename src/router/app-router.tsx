import { Route, Routes } from 'react-router-dom'

import { PublicRoute } from './public-routes'
import { PrivateRoute } from './private-route'
import { LoginScreen } from '../screens/auth'

export const AppRouter = () => {
  return (
    <Routes>
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
            <h1>Dashboard</h1>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
