import { Select } from "antd";
import { useEffect, useState } from "react";
import { useStudent } from "../context/student";

const { Option } = Select;

const StudentSelect = ({ ...props }) => {
  const { students, loading, page, limit, fetchData } = useStudent()
  const [hasMore, setHasMore] = useState(true);

  const onScroll = async (event: any) => {
    const target = event.target;
    if (
      !loading &&
      hasMore &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 10
    ) {
      console.log("Load more students...");
      await fetchData({ page, limit });

      // Actualizar la variable `hasMore` si no hay más estudiantes para cargar
      if (students.length < page * limit) {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    if (!students.length) {
      fetchData({});
    }
  }, []);

  return (
    <Select
      style={{ width: '100%' }}
      loading={loading}
      onPopupScroll={onScroll}
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