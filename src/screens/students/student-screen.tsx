import { StudentsTable } from "../../components/table"
import { useDataContext } from "../../context/data"

export const StudentScreen = () => {
  const { students } = useDataContext()

  return <StudentsTable data={students} />
}
