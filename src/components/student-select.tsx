import { Select } from "antd";
import { useEffect, useState } from "react";
import { useStudent } from "../context/student";
import { getAllStudents } from "../api/students";

const { Option } = Select;

const StudentSelect = ({ ...props }) => {
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])

  useEffect(() => {
    getAllStudents({ limit: 1000 })
      .then(({ data }) => {
        setStudents(data.response)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  return (
    <Select
      style={{ width: '100%' }}
      loading={loading}
      {...props}
    >
      {students.map(({ _id, firstname, lastname }) => (
        <Option key={_id} value={`${firstname} ${lastname}`}>
          {`${firstname} ${lastname}`}
        </Option>
      ))}
      {loading && <Option disabled>Cargando...</Option>}
    </Select>
  );
};

export default StudentSelect;