import { Select } from "antd";
import { useEffect, useState } from "react";
import { useTeacherContext } from "../context/teacher";

const { Option } = Select;

const TeacherSelect = () => {
  const { teachers, loading, page, fetchTeacher } = useTeacherContext()
  const [children, setChildren] = useState(teachers);

  const onScroll = async (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      console.log("Load...");
      target.scrollTo(0, target.scrollHeight);
      fetchTeacher({
        page: page + 1
      })
      setChildren([...children, ...teachers])
    }
  };

  useEffect(() => {
    fetchTeacher({})
    setChildren(teachers)
  }, [])

  return (
    <Select loading={loading} onPopupScroll={onScroll}>
      {children.map(({ _id, firstname, lastname }) => (
        <Option key={_id} value={`${firstname} ${lastname}`}>
          {`${firstname} ${lastname}`}
        </Option>
      ))}
      {loading && <Option>Loading...</Option>}
    </Select>
  );
};

export default TeacherSelect;