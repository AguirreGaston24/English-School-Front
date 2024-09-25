import { Select } from "antd";
import { useEffect, useState } from "react";
import { getAllTeachers } from "../api/teacher";

const { Option } = Select;

const TeacherSelect = ({ ...props }) => {
  const [loading, setLoading] = useState(false)
  const [teachers, setTeachers] = useState([])

  
  useEffect(() => {
    getAllTeachers({ limit: 1000 })
      .then(({ data }) => {
        setTeachers(data.response)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Select loading={loading}  {...props}>
      {teachers.map(({ _id, firstname, lastname }) => (
        <Option key={_id} value={`${firstname} ${lastname}`}>
          {`${firstname} ${lastname}`}
        </Option>
      ))}
    </Select>
  );
};

export default TeacherSelect;