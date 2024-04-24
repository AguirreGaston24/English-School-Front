import { Route, Routes } from 'react-router-dom'

import { PublicRoute } from './public-routes'
import { PrivateRoute } from './private-route'
import { LoginScreen } from '../screens/auth'
import { MainLayout } from '../components/layout'
import { HomeScreen } from '../screens'

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
            <MainLayout>
             <HomeScreen/>
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
