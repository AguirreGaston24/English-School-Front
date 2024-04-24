import { Navigate } from 'react-router-dom'

import { useAuthContext } from '../context/auth'
import { LoadingScreen } from '../screens'


interface PrivateRouteProps {
  children: JSX.Element | JSX.Element[]
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, uiLoading } = useAuthContext()

  if (!user && uiLoading) return <LoadingScreen />

  if (!user?.username) return <Navigate to='/login' />

  return (<>{children}</>)
}
