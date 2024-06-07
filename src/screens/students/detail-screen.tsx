import { Breadcrumb, Button, Card, Divider, Form, Input, Select, Table, TableProps } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"
import { createSchemaFieldRule } from "antd-zod";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import moment from "moment";
import { z } from "zod";

import { createStudent, getStudent, updateStudent } from "../../api/students";
import { StudentSchema } from "../../libs/schemas/student";
import { DAYS_OF_WEEK } from "../../constant/days_of_week";
import { LEVELS } from "../../constant/levels";
import { ADDRESSES } from "../../constant/address";
import { SCHOOl } from "../../constant/schools";
import { useTeacherContext } from "../../context/teacher";

const rule = createSchemaFieldRule(StudentSchema);
type UserFormValue = z.infer<typeof StudentSchema>;

const { useForm } = Form;

const columns: TableProps<any>['columns'] = [
  { title: 'Group', dataIndex: 'group_id', key: 'group_id', },
  { title: 'Nivel', dataIndex: 'level', key: 'nivel' },
  { title: 'Teacher', dataIndex: 'teacher', key: 'teacher' },
  { title: 'Start Date', dataIndex: 'start_date', key: 'start_date', render: (_, record) => moment(record.start_date).format('h:mm A') },
  { title: 'End Date', dataIndex: 'end_date', key: 'end_date', render: (_, record) => moment(record.end_date).format('h:mm A') },
  {
    dataIndex: 'days',
    key: 'days',
    width: 100,
    children: DAYS_OF_WEEK.map(({ value }, i) => ({
      title: value,
      dataIndex: value,
      key: value,
      width: 20,
      render: (_, record) => record.days.includes(value) ? 'X' : ''
    }))
  },
];

export const StudentDetails = () => {
  const [selectedGroups, setSelectedGroups] = useState<any>([]);
  const { teachers } = useTeacherContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const [form] = useForm()
  const id = params.id === 'new' ? false : params.id
  const action = id ? "Guardar Cambios" : "Crear Usuario";
  const message = id ? 'Exito en actualizar el usuario!.' : 'Exito en cargar el usuario!.';


  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    if (id) {
      updateStudent(id, {
        ...data,
        group: selectedGroups
      })
        .then(({ data }) => {
          console.log(data)
          navigate('/students')
          toast.success(message)
        })
        .catch((err) => {
          console.log(err)
          toast.error('Opss. Algo salio mal!.')
        })
        .finally(() => setLoading(false))
    } else {
      createStudent({
        ...data,
        group: selectedGroups
      })
        .then(({ data }) => {
          console.log(data)
          navigate('/students')
          toast.success(message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setLoading(false))
    }
  };

  const handleRowSelectionChange = (selectedRowId: any, selectedRows: any[]) => {
    console.log(`selectedRowId: ${selectedRowId}`, 'selectedGroup: ', selectedRows);
    const groups = selectedRows.map((g) => g.group_id)
    setSelectedGroups(groups);
  };


  useEffect(() => {
    if (!id) return
    getStudent(id)
      .then(({ data }) => {
        form.setFieldsValue(data.response)
        console.log(data.response)
      })
      .catch((error) => console.log(error))
      .finally(() => { })

  }, [id])


  return (
    <div>
      <Breadcrumb className='section-not-print mb-4'>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center justify-between space-y-6 mb-4" id='section-not-print'>
        <Link
          className="flex gap-2 items-center"
          to='/students'
        >
          <FaArrowLeft />
          Volver
        </Link>
        <Button className="!mt-0" onClick={() => window.print()}>Imprimir</Button>
      </div>
      <Card>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmit}
        >
          <Divider orientation="left">Información del estudiante</Divider>

          <div className="md:grid md:grid-cols-3 gap-8">
            <div>

              <Form.Item
                label="Nombre"
                name="firstname"
                rules={[rule]}
              >
                <Input placeholder="Ingrese el nombre" />
              </Form.Item>
              <Form.Item
                label="Correo"
                name="email"
                rules={[rule]}
              >
                <Input placeholder="test@test.com" />
              </Form.Item>

              <Form.Item
                label="Direccíon"
                name="address"
                rules={[rule]}
              >
                <Input
                  placeholder="Ingrese una direccíon"
                />
              </Form.Item>

              <Form.Item
                label="Barrio"
                name="district"
                rules={[rule]}
              >
                <Select placeholder='Seleccione el barrio' options={ADDRESSES} />
              </Form.Item>

              <Form.Item
                label="Profesor/a"
                name="teacher"
                rules={[rule]}
              >
                <Select placeholder='Selecciones un profesor/a' options={teachers.map((t) => ({ label: `${t.firstname} ${t.lastname}`, value: `${t.firstname} ${t.lastname}` }))} />
              </Form.Item>

            </div>


            <div>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[rule]}
              >
                <Input type="text" placeholder='Lastname' />
              </Form.Item>

              <Form.Item
                label="Celular"
                name="phone"
                rules={[rule]}
              >
                <Input type="text" placeholder='12345677809' />
              </Form.Item>


              <Form.Item
                label="Localidad"
                name="country"
                rules={[rule]}
              >
                <Input type="text" placeholder='12345677809' />
              </Form.Item>

              <Form.Item
                label="Ciudad"
                name="city"
                rules={[rule]}
              >
                <Input type="text" placeholder='12345677809' />
              </Form.Item>

            </div>

            <div>

              <Form.Item
                label='DNI'
                name='dni'
                rules={[rule]}
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item
                label='Fecha de cumpleaños'
                name='birth_date'
                rules={[rule]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                label='Escuela'
                name='school'
                rules={[rule]}
              >
                <Select placeholder='Seleccione la escuela' options={SCHOOl} />
              </Form.Item>

              <Form.Item
                label='Nivel'
                name='level'
                rules={[rule]}
              >
                <Select options={LEVELS} />
              </Form.Item>

            </div>

          </div>
          <Divider orientation="left">Información del tutor</Divider>
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
              <Form.Item
                label="Tutor"
                name="tutor"
                rules={[rule]}
              >
                <Input placeholder="Ingrese el nombre del tutor" />
              </Form.Item>

              <Form.Item
                label="Direccíon del tutor"
                name="tutor_address"
                rules={[rule]}
              >
                <Input placeholder="Ingrese la direccíon del tutor" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Trabajo"
                name="Ingrese donde trabaja"
                rules={[rule]}
              >
                <Input placeholder="Ingrese donde trabaja" />
              </Form.Item>
              <Form.Item
                label="Localidad"
                name="tutor_district"
                rules={[rule]}
              >
                <Input placeholder="Ingrese la localidad" />

              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Teléfono"
                name="tutor_phone"
                rules={[rule]}
              >
                <Input placeholder="Ingrese el numero de teléfono" />
              </Form.Item>
            </div>
          </div>
          <Divider>Seleccion de grupo</Divider>
          <Table
            size='small'
            scroll={{ x: 800 }}
            columns={columns}
            dataSource={[]}
            rowKey="_id"
            rowSelection={{
              type: 'radio',
              onChange: handleRowSelectionChange,
            }}
          />
          <Button className="col-start-2" loading={loading} htmlType="submit">
            {action}
          </Button>
        </Form>
      </Card>
    </div >
  )
}
