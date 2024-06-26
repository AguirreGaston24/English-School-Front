import { Select } from "antd";
import { useEffect, useState } from "react";
import { useStudent } from "../context/student";

const { Option } = Select;

const StudentSelect = ({ ...props }) => {
  const { students, loading, page, limit, fetchData } = useStudent()
  const [children, setChildren] = useState(students);

  const onScroll = async (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      console.log("Load...");
      target.scrollTo(0, target.scrollHeight);
      fetchData({
        page,
        limit
      })
      setChildren([...children, ...students])
    }
  };

  useEffect(() => {
    fetchData({})
    setChildren(students)
  }, [])

  return (
    <Select style={{ width: '100%' }} loading={loading} onPopupScroll={onScroll} {...props}>
      {children.map(({ _id, firstname, lastname }) => (
        <Option key={_id} value={`${firstname} ${lastname}`}>
          {`${firstname} ${lastname}`}
        </Option>
      ))}
      {loading && <Option>Loading...</Option>}
    </Select>
  );
};

export default StudentSelect;