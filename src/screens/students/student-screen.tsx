import { TableProps, Space, Tooltip, Button, Table, Input, Modal, Select, Form } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import moment from "moment"

import { ADDRESSES } from "../../constant/address";
import { GROUPS } from "../../constant/groups";
import { SCHOOl } from "../../constant/schools";
import { useStudent } from "../../context/student";
import { deleteStudent } from "../../api/students";
import { useTeacherContext } from "../../context/teacher";
import TeacherSelect from "../../components/teacher-select";

const { Search } = Input
const { confirm } = Modal;

export const StudentScreen = () => {
  const { students, loading, limit, page, total, fetchData, handleFilterChange } = useStudent()
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const showDeleteConfirm = (studentId: string) => {
    confirm({
      title: "¿Estás seguro de que quieres eliminar este alumno?",
      okText: "Sí",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteStudent(studentId)
          .then(() => {
            fetchData({ limit, page, })
            toast.success('Exito')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Error')
          })
      }
    })
  }




  const handleWhatsAppNavigate = (phoneNumber: string) => {
    const message = 'Hello, I would like to get more information.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 120,
    },
    { title: 'Correo Electronico', dataIndex: 'email', key: 'email', width: 250 },
    { title: 'Telefono', dataIndex: 'phone', key: 'phone', width: 150, },
    { title: 'Direccion', dataIndex: 'address', key: 'address', ellipsis: true },
    { title: 'Barrio', dataIndex: 'district', key: 'district', width: 150, },
    { title: 'DNI', dataIndex: 'dni', key: 'dni', width: 150, },
    { title: 'Escuela', dataIndex: 'school', key: 'school', width: 200, ellipsis: true },
    { title: 'Grupo', dataIndex: 'group', key: 'group', width: 80, align: 'center' },
    { title: 'Profesora', dataIndex: 'teacher', key: 'teacher', width: 250 },
    { title: 'Cumpleaño', dataIndex: 'birth_date', key: 'birth_date', align: 'center', width: 100, render: (_, record) => moment(record.birth_date).format('DD-MM-YYYY') },
    { title: 'Tutor a cargo', dataIndex: 'tutor_occupation', key: 'tutor_occupation', width: 200, ellipsis: true },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Editar">
            <Button type="text" icon={<FaPencil size={18} />} onClick={() => navigate(`/students/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Enviar Whatsapp">
            <Button type="text" icon={<FaWhatsapp size={18} />} onClick={() => handleWhatsAppNavigate(record.phone)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button type="text" icon={<MdDelete size={24} />} onClick={() => showDeleteConfirm(record._id)} />
          </Tooltip>
        </Space>
      )
    },
  ];

  return (
    <div>
      <Form
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4"
        layout="vertical"
      >
        <Form.Item label='Registrar un alumno'>
          <Button block onClick={() => navigate('/students/new')}>Nuevo alumno</Button>
        </Form.Item>
        <Form.Item label='Buscador'>
          <Search allowClear name="search" placeholder="Buscar..." onSearch={(value) => handleFilterChange([["term", value]])} defaultValue={searchParams.get("term") || undefined} />
        </Form.Item>
        <Form.Item label='Filtro por barrio'>
          <Select allowClear placeholder='Filtro por barrio' options={ADDRESSES} onChange={(value) => handleFilterChange([['district', value]])} defaultValue={searchParams.get("district") || undefined} />
        </Form.Item>
        <Form.Item label='Filtro por escuela'>
          <Select allowClear placeholder='Escuela Provincial Nº 462' options={SCHOOl} onChange={(value) => handleFilterChange([['school', value]])} defaultValue={searchParams.get("school") || undefined} />
        </Form.Item>
        <Form.Item label='Filtro por grupo'>
          <Select allowClear placeholder='G1' options={GROUPS} onChange={(value) => handleFilterChange([['group', value]])} defaultValue={searchParams.get("group") || undefined} />
        </Form.Item>
        <Form.Item label='Filtro por profe'>
          <TeacherSelect allowClear placeholder='Glauco Morán' onChange={(value: string) => handleFilterChange([['teacher', value]])} defaultValue={searchParams.get("teacher") || undefined} />
        </Form.Item>
      </Form>
      <Table
        size="small"
        dataSource={students}
        columns={columns}
        loading={loading}
        scroll={{ x: 2000 }}
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
