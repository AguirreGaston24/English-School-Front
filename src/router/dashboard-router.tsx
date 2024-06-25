import { Route, Routes } from "react-router-dom"

import { HomeScreen, StudentDetails, StudentScreen } from "../screens"
import { TeacherScreen } from "../screens/teacher"
import { TeacherDetails } from "../screens/teacher/detail-screen"
import { GroupsScreen } from "../screens/groups"
import { BillingScreen } from "../screens/billing"


export const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path='students'>
        <Route index element={<StudentScreen />} />
        <Route path=":id" element={<StudentDetails />} />
      </Route>
      <Route path='teachers'>
        <Route index element={<TeacherScreen />} />
        <Route path=":id" element={<TeacherDetails />} />
      </Route>
      <Route path='groups' element={<GroupsScreen />} />
      <Route path='billing' element={<BillingScreen />} />
    </Routes>
  )
}
