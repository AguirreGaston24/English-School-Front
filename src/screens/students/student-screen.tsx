import { TableProps, Space, Tooltip, Button, Table, Input } from "antd"
import { LuMessageCircle } from "react-icons/lu"
import { BiSolidUserDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom"
import { FaPencil } from "react-icons/fa6"
import moment from "moment"

import { useDataContext } from "../../context/data"
import { MdOutlineEmail } from "react-icons/md";

const { Search } = Input

export const StudentScreen = () => {
  const { students, loading, getStudents } = useDataContext()
  const navigate = useNavigate()

  const columns: TableProps<any>['columns'] = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 120,
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 250 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 150, },
    { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'District', dataIndex: 'district', key: 'district', width: 150, },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150, },
    { title: 'School', dataIndex: 'school', key: 'school' },
    { title: 'Groups', dataIndex: 'groups', key: 'groups', render: (_, record) => record.groups?.join('-') },
    { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Birth Date', dataIndex: 'birth_date', key: 'birth_date', render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY') },
    { title: 'Tutor Occupation', dataIndex: 'tutor_occupation', key: 'tutor_occupation', width: 200 },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Chatear por consulta">
            <Button type="text" icon={<LuMessageCircle size={18} />} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button type="text" icon={<FaPencil size={18} />} onClick={() => navigate(`/students/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Detalles">
            <Button type="text" icon={<BiSolidUserDetail size={24} />} onClick={() => navigate(`/students/details/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Enviar un correo">
            <Button type="text" icon={<MdOutlineEmail size={18} />} />
          </Tooltip>
        </Space>
      )
    },
  ];
  return (
    <div>
      <div className="w-1/2 grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2 mb-5">
        <Button onClick={() => navigate('/students/new')}>New student</Button>
        <Search allowClear name="search" placeholder="Buscar..." onSearch={(value) => getStudents({ term: value })} />
      </div>
      <Table
        size="small"
        dataSource={students}
        columns={columns}
        loading={loading}
        scroll={{ x: 1800 }}
      />
    </div>
  )
}
