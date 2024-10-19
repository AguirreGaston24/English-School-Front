import {
  TableProps, Space, Tooltip, Button, Table, Input, Modal, Select, Form, Row, Col
} from "antd";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { toast } from "sonner";
import moment from "moment";
import { useState, useCallback, useMemo } from "react";

import { GROUPS } from "../../constant/groups";
import { useStudent } from "../../context/student";
import { deleteStudent } from "../../api/students";
import TeacherSelect from "../../components/teacher-select";

const { confirm } = Modal;

export const StudentScreen = () => {
  const { students, loading, limit, page, total, fetchData, handleFilterChange } = useStudent();
  const navigate = useNavigate();
  const { confirm } = Modal;
  // Estados para los filtros
  const [searchDni, setSearchDni] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [searchGroup, setSearchGroup] = useState('');

  // Función para mostrar la confirmación al eliminar
  const showDeleteConfirm = useCallback((studentId: string) => {
    if (!studentId) {
      toast.error('ID de alumno inválido');
      return;
    }
  
    console.log(`Deleting student with ID: ${studentId}`);
  
    confirm({
      title: "¿Estás seguro de que quieres eliminar este alumno?",
      okText: "Sí",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteStudent(studentId)
          .then(() => {
            fetchData({ limit, page }); // Vuelve a cargar los datos después de la eliminación
            toast.success('Alumno eliminado con éxito');
          })
          .catch((error) => {
            console.error('Error eliminando al alumno:', error);
            toast.error('Error al eliminar el alumno');
          });
      }
    });
  }, [limit, page, fetchData]);

  // Función para abrir WhatsApp
  const handleWhatsAppNavigate = useCallback((phoneNumber: string) => {
    const message = 'Hola, me gustaría obtener más información.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  // Filtrar los estudiantes en tiempo real
  const filteredStudents = useMemo(() => {
    return students
      .filter(student => student !== null) // Filtra estudiantes que son null
      .filter(student =>
        (student.dni?.includes(searchDni) || '') &&
        (`${student.firstname ?? ''} ${student.lastname ?? ''}`.toLowerCase().includes(searchName.toLowerCase())) &&
        (student.teacher?.toLowerCase().includes(searchTeacher.toLowerCase()) || '') &&
        (student.group?.includes(searchGroup) || '')
      );
  }, [students, searchDni, searchName, searchTeacher, searchGroup]);

  // Columnas de la tabla
  const columns: TableProps<any>['columns'] = useMemo(() => [
    { title: 'Nombre', dataIndex: 'firstname', key: 'firstname', width: 150 },
    { title: 'Apellido', dataIndex: 'lastname', key: 'lastname', width: 120 },
    { title: 'Correo Electrónico', dataIndex: 'email', key: 'email', width: 250, ellipsis: true },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone', width: 150 },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150 },
    { title: 'Grupo', dataIndex: 'group', key: 'group', width: 80, align: 'center' },
    { title: 'Profesora', dataIndex: 'teacher', key: 'teacher', width: 250 },
    { title: 'Cumpleaños', dataIndex: 'birth_date', key: 'birth_date', align: 'center', width: 100, render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY') },
    { title: 'Tutor a Cargo', dataIndex: 'tutor_occupation', key: 'tutor_occupation', width: 200, ellipsis: true },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => {
        if (!record) return null; // Asegúrate de que el registro no sea null
        return (
          <Space>
            <Tooltip title="Editar">
              <Button type="text" icon={<FaPencil size={18} style={{ color: 'blue' }} />} onClick={() => navigate(`/students/${record._id}`)} />
            </Tooltip>
            <Tooltip title="Enviar WhatsApp">
              <Button type="text" icon={<FaWhatsapp size={18} style={{ color: 'blue' }} />} onClick={() => handleWhatsAppNavigate(record.phone)} />
            </Tooltip>
            <Tooltip title="Eliminar">
              <Button type="text" icon={<MdDelete size={24} style={{ color: 'blue' }} />} onClick={() => showDeleteConfirm(record._id)} />
            </Tooltip>
          </Space>
        );
      }
    }
  ], [navigate, handleWhatsAppNavigate, showDeleteConfirm]);
  

  return (
    <div>
      {/* Botón para registrar nuevo alumno */}
      <Row gutter={[16, 16]} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-2 mb-5">
        <Col span={24}>
          <Button block onClick={() => navigate('/students/new')}>Registrar Nuevo Alumno</Button>
        </Col>
      </Row>
  
      {/* Campos de búsqueda */}
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={6}>
          <Form.Item>
            <Input 
              placeholder="Buscar por DNI" 
              value={searchDni} 
              onChange={(e) => setSearchDni(e.target.value)} 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Input 
              placeholder="Buscar por nombre o apellido" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <TeacherSelect 
              placeholder="Buscar por profesor/a" 
              allowClear
              onChange={(value: string) => setSearchTeacher(value || '')} 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Select 
              placeholder="Buscar por grupo"
              allowClear
              options={GROUPS}
              onChange={(value) => setSearchGroup(value || '')} 
            />
          </Form.Item>
        </Col>
      </Row>
  
      {/* Tabla de estudiantes */}
      <Table
        size='small'
        dataSource={filteredStudents}
        columns={columns}
        loading={loading}
        scroll={{ x: 1800 }}
        rowKey="_id"
        pagination={{
          className: 'section-not-print px-4',
          total,
          current: page,
          pageSize: limit,
          onChange: (page, pageSize) => handleFilterChange([["page", page.toString()], ["limit", pageSize.toString()]]),
          showSizeChanger: true,
          locale: { items_per_page: 'x pág.' }
        }}
      />
    </div>
  );
};
