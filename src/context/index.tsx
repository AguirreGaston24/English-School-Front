import { StudentProvider } from './student'
import { TeacherProvider } from './teacher'

interface ContextProviderProps {
  children: JSX.Element | JSX.Element[]
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  return (
    <TeacherProvider>
      <StudentProvider>
        {children}
      </StudentProvider>
    </TeacherProvider>
  )
}

export { ThemeProvider } from './theme'
export { AuthProvider } from './auth'
