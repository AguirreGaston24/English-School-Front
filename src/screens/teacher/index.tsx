import { TableProps, Space, Tooltip, Button, Table, Input, Row, Col } from 'antd';
import { LuMessageCircle } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { FaPencil, FaTrash, FaWhatsapp } from 'react-icons/fa6'; // Importar FaWhatsapp
import moment from 'moment';
import { ITeacher } from '../../interfaces/teacher';
import { useTeacherContext } from '../../context/teacher';
import { useState, useCallback, useEffect } from 'react';

export const TeacherScreen = () => {
  const { teachers, loading, limit, page, total, handleFilterChange, handleDelete, fetchTeacher } = useTeacherContext();
  const navigate = useNavigate();

  // Estados para filtros
  const [searchDni, setSearchDni] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  // Función para abrir WhatsApp
  const handleWhatsAppNavigate = useCallback((phoneNumber: string) => {
    const message = 'Hola, me gustaría obtener más información.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  // Filtrar profesores por DNI, Nombre y Email
  const filteredTeachers = teachers.filter(teacher => 
    teacher.dni.includes(searchDni) && 
    (`${teacher.firstname} ${teacher.lastname}`).toLowerCase().includes(searchName.toLowerCase()) &&
    teacher.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const columns: TableProps<ITeacher>['columns'] = [
    { title: 'Nombre', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Apellido', dataIndex: 'lastname', key: 'lastname' },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', width: 150 },
    { title: 'Dirección', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'Barrio', dataIndex: 'district', key: 'district', width: 250 },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150 },
    {
      title: 'Fecha de nacimiento',
      dataIndex: 'birth_date',
      key: 'birth_date',
      align: 'center',
      width: 150,
      render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY')
    },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              type="link"
              shape="circle"
              icon={<FaPencil size={18} />}
              onClick={() => navigate(`/teachers/${record._id}`)}
            />
          </Tooltip>

          <Tooltip title="Eliminar">
            <Button
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              type="link"
              shape="circle"
              icon={<FaTrash size={18} />}
              onClick={async () => {
                await handleDelete(record._id); // Eliminar profesor
              }}
            />
          </Tooltip>  
          
          <Tooltip title="Enviar WhatsApp">
            <Button
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              type="link"
              shape="circle"
              icon={<FaWhatsapp size={18} />} // Ícono de WhatsApp
              onClick={() => handleWhatsAppNavigate(record.phone)}
            />
          </Tooltip>
        </Space>
      )
    },
  ];

  useEffect(() => {   
    const interval = setInterval(() => {
      fetchTeacher({ limit, page });
    }, 5000); // Cada 5 segundos
  
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [limit, page]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2 mb-5">
        <Button onClick={() => navigate('/teachers/new')}>Registrar Profesor/a</Button>
      </div>

      {/* Campos de búsqueda */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={8}>
          <Input 
            placeholder="Buscar por DNI" 
            value={searchDni} 
            onChange={(e) => setSearchDni(e.target.value)} 
          />
        </Col>
        <Col span={8}>
          <Input 
            placeholder="Buscar por nombre o apellido" 
            value={searchName} 
            onChange={(e) => setSearchName(e.target.value)} 
          />
        </Col>
        <Col span={8}>
          <Input 
            placeholder="Buscar por email"
            value={searchEmail} 
            onChange={(e) => setSearchEmail(e.target.value)} 
          />
        </Col>
      </Row>

      <Table
        size='small'
        dataSource={filteredTeachers}
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
  );
};
