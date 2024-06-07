import { Route, Routes } from "react-router-dom"

import { HomeScreen, StudentDetails, StudentScreen } from "../screens"
import { TeacherScreen } from "../screens/teacher"
import { TeacherDetails } from "../screens/teacher/detail-screen"
import { GroupsScreen } from "../screens/groups"
import ListStudentsScreen from "../screens/list-students/list-students-screen"
import RankingScreen from "../screens/ranking/rankingScreen"
import { BirthdayScreen } from "../screens/birthday/birthdayScreen"


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
      <Route path='list-students'>
        <Route index element={<ListStudentsScreen />} />
        <Route path=":id" element={<ListStudentsScreen />} />
      </Route>
      <Route path='ranking'>
        <Route index element={<RankingScreen />} />
        <Route path=":id" element={<RankingScreen />} />
      </Route>
      <Route path='birthday'>
        <Route index element={<BirthdayScreen />} />
        <Route path=":id" element={<BirthdayScreen />} />
      </Route>
    </Routes>
  )
}
