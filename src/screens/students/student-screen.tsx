import { TableProps, Space, Tooltip, Button, Table, Input, Modal, Select } from "antd"
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { teachers } = useTeacherContext()
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
      <div className="px-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-2 mb-5 w-full  items-center ">
          <Button className="w-full " onClick={() => navigate('/students/new')}>Agregar alumno</Button>
          <div className="w-full">
            <p className="mb-3">Buscar de manera general</p>
            <Search
              allowClear name="search" placeholder="Buscar..." onSearch={(value) => handleFilterChange([["term", value]])} defaultValue={searchParams.get("term") || ""} className="w-full" />
          </div>
          <div className="w-full">
            <p className="mb-3">Filtra por barrio</p>
            <Select allowClear placeholder='Busca por barrio' options={ADDRESSES} onChange={(value) => handleFilterChange([['district', value]])} defaultValue={searchParams.get("district") || ""} className="w-full" />
          </div>
          <div className="w-full">
            <p className="mb-3">Filtra por escuela</p>
            <Select allowClear placeholder='Busca por escuela' options={SCHOOl} onChange={(value) => handleFilterChange([['school', value]])} defaultValue={searchParams.get("school") || ""} className="w-full" />
          </div>
          <div className="w-full">
            <p className="mb-3">Filtra por grupo</p>
            <Select allowClear placeholder='Busca por grupo' options={GROUPS} onChange={(value) => handleFilterChange([['group', value]])} defaultValue={searchParams.get("group") || ""} className="w-full" />
          </div>
          <div className="w-full">
            <p className="mb-3">Filtra por profe</p>
            <TeacherSelect allowClear placeholder='Busca por profe' onChange={(value: string) => handleFilterChange([['teacher', value]])} defaultValue={searchParams.get("teacher") || ""} className="w-full" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-5">Alumnos Registrados:</h1>
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
