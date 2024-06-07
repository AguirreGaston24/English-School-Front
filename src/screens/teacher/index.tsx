import { TableProps, Space, Tooltip, Button, Table } from 'antd';
import { LuMessageCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';
import moment from 'moment';

import { ITeacher } from '../../interfaces/teacher';
import { useTeacherContext } from '../../context/teacher';

export const TeacherScreen = () => {
  const { teachers, loading } = useTeacherContext()
  const navigate = useNavigate()

  const columns: TableProps<ITeacher>['columns'] = [
    {
      title: 'First Name',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 150, },
    { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'District', dataIndex: 'district', key: 'district', width: 250, },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150, },
    { title: 'Birth Date', dataIndex: 'birth_date', key: 'birth_date', align: 'center', width: 150, render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY') },
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
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<FaPencil size={18} />} onClick={() => navigate(`/teachers/${record._id}`)} />
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
      <div className="w-1/2 grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2 mb-5">
        <Button onClick={() => navigate('/teachers/new')}>New teacher</Button>
      </div>
      <Table
        size='small'
        dataSource={teachers}
        columns={columns}
        loading={loading}
        scroll={{ x: 1800 }}
      />
    </div>
  )
}
