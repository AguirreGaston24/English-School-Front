import { Route, Routes } from "react-router-dom"

import { HomeScreen, StudentDetails, StudentScreen } from "../screens"


export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path='students'>
        <Route index element={<StudentScreen />} />
        <Route path=":id" element={<StudentDetails />} />
      </Route>
    </Routes>
  )
}
