import { Route, Routes } from "react-router-dom"

import { HomeScreen, StudentDetails, StudentScreen } from "../screens"
import { AssistsScreen } from "../screens/assist"
import { TeacherScreen } from "../screens/teacher"
import { TeacherDetails } from "../screens/teacher/detail-screen"
import { GroupsScreen } from "../screens/groups"


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
      <Route path='groups'>
        <Route index element={<GroupsScreen />} />
        {/* <Route path=":id" element={<TeacherDetails />} /> */}
      </Route>
      <Route path="/assists" element={<AssistsScreen />} />
    </Routes>
  )
}
