import { TableProps, Space, Tooltip, Button, Table } from 'antd';
import { LuMessageCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import moment from 'moment';

import { ITeacher } from '../../interfaces/teacher';
import { useTeacherContext } from '../../context/teacher';

export const TeacherScreen = () => {
  const { teachers, loading, limit, page, total, handleFilterChange, handleDelete } = useTeacherContext()
  const navigate = useNavigate()

  const columns: TableProps<ITeacher>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', width: 150, },
    { title: 'Dirección', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'Barrio', dataIndex: 'district', key: 'district', width: 250, },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150, },
    { title: 'Fecha de nacimiento', dataIndex: 'birth_date', key: 'birth_date', align: 'center', width: 150, render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY') },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<FaPencil size={18} />} onClick={() => navigate(`/teachers/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<FaTrash size={18} />} onClick={(value) => handleDelete(record._id)} />
          </Tooltip>
        </Space>
      )
    },
  ];


  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2 mb-5">
        <Button onClick={() => navigate('/teachers/new')}>Registrar Profesor/a</Button>
      </div>
      <Table
        size='small'
        dataSource={teachers}
        columns={columns}
        loading={loading}
        scroll={{ x: 1800 }}
        rowKey="_id"
        pagination={{
          className: 'section-not-print px-4',
          rootClassName: '',
          locale: {
            items_per_page: 'x pág.',
          },
          total,
          current: page,
          pageSize: limit,
          onChange: (page, pageSize) => handleFilterChange([["page", page.toString()], ["limit", pageSize.toString()]]),
          showSizeChanger: true
        }}
      />
    </div>
  )
}
