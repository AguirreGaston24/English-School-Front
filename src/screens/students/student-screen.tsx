import { Button, Space, Table, TableProps, Tooltip } from "antd";
import { LuMessageCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";

import { USERS } from "../../constant/users";

export const StudentScreen = () => {
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
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 150, },
    { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'District', dataIndex: 'district', key: 'district', width: 150, },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150, },
    { title: 'School', dataIndex: 'school', key: 'school' },
    { title: 'Group', dataIndex: 'group', key: 'group' },
    { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Birth Date', dataIndex: 'birth_date', key: 'birth_date' },
    { title: 'Tutor Occupation', dataIndex: 'tutor_occupation', key: 'tutor_occupation' },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Chatear por consulta">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<LuMessageCircle size={18} />} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<FaPencil size={18} />} onClick={() => { }} />
          </Tooltip>
          <Tooltip title="Detalles">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<FaPencil size={18} />} onClick={() => navigate(`/students/${record.id}`)} />
          </Tooltip>
          <Tooltip title="Enviar un correo">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<FaPencil size={18} />} />
          </Tooltip>
        </Space>
      )
    },
  ];


  return (
    <div>
      <Table
        dataSource={USERS}
        columns={columns}
        scroll={{ x: 1800 }}
      />
    </div>
  )
}
