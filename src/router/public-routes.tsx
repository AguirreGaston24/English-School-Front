import { Navigate } from "react-router-dom"

import { useAuthContext } from "../context/auth"
import { LoadingScreen } from "../screens"

interface PublicRouteProps {
  children: JSX.Element | JSX.Element[]
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, uiLoading } = useAuthContext()

  if (!user && uiLoading) return <LoadingScreen />

  if (user?.username) return <Navigate to='/' />

  return (<>{children}</>)
}
