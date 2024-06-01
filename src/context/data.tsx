import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IStudent } from "../interfaces/student";
import { Pagination, getAllStudents } from "../api/students";
import { getAllTeachers } from "../api/teacher";
import { ITeacher } from "../interfaces/teacher";
import { getAllGroups } from "../api/groups";

interface DataContextProps {
  students: IStudent[];
  teachers: ITeacher[];
  groups: any;
  loading: boolean;
  getStudents: (p: Pagination) => void
}

interface DataProviderProps {
  children: ReactNode;
}

const Context = createContext<DataContextProps | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Data context debe ser utilizado dentro de un provider.');
  }
  return context;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [groups, setGroups] = useState([])



  const getStudents = (params?: Pagination) => {
    setLoading(true)
    getAllStudents(params)
      .then(({ data }) => {
        setStudents(data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const getTeachers = () => {
    setLoading(true)
    getAllTeachers({})
      .then(({ data }) => {
        setTeachers(data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  const getGroups = () => {
    setLoading(true)
    getAllGroups()
      .then(({ data }) => {
        setGroups(data.response)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getStudents()
    getTeachers()
    getGroups()
  }, [])

  return (
    <Context.Provider value={{
      loading,
      students,
      teachers,
      groups,
      getStudents
    }}>
      {children}
    </Context.Provider>
  )
}
