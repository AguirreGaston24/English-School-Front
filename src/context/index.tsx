import { BillingProvider } from './billing'
import { GroupProvider } from './group'
import { StudentProvider } from './student'
import { TeacherProvider } from './teacher'

interface ContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <TeacherProvider>
      <StudentProvider>
        <GroupProvider>
          <BillingProvider>
            {children}
          </BillingProvider>
        </GroupProvider>
      </StudentProvider>
    </TeacherProvider>
  )
}

export { ThemeProvider } from './theme'
export { AuthProvider } from './auth'
