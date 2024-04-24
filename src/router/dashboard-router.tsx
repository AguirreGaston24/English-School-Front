import { Route, Routes } from "react-router-dom"

import { HomeScreen } from "../screens"


export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
    </Routes>
  )
}
