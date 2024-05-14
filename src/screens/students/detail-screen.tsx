import { z } from "zod";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Divider, Form, Input, Select } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom"
import { createSchemaFieldRule } from "antd-zod";

import { StudentSchema } from "../../libs/schemas/student";
import { FaArrowLeft } from "react-icons/fa6";
import { createStudent, getStudent, updateStudent } from "../../api/students";
import { toast } from "sonner";
import { LEVELS } from "../../constant/levels";
import { useDataContext } from "../../context/data";

const rule = createSchemaFieldRule(StudentSchema);
type UserFormValue = z.infer<typeof StudentSchema>;

const { useForm } = Form;

export const StudentDetails = () => {
  const {teachers} = useDataContext()
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
      updateStudent(id, data)
        .then(({ data }) => {
          console.log(data)
          navigate('/')
          toast.success(message)
        })
        .catch((err) => {
          console.log(err)
          toast.error('Opss. Algo salio mal!.')
        })
        .finally(() => setLoading(false))
    } else {
      createStudent(data)
        .then(({ data }) => {
          console.log(data)
          navigate('/')
          toast.success(message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setLoading(false))
    }
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
      <Breadcrumb className='section-not-print'>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Students</Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center justify-between" id='section-not-print'>
        <Link
          className="flex gap-2 items-center"
          to='/'
        >
          <FaArrowLeft />
          Volver
        </Link>
        <div className="flex items-center">
          <Button onClick={() => window.print()}>Imprimir</Button>
        </div>
      </div>
      <Card>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmit}
        >
          <Divider orientation="left">Student Information</Divider>

          <div className="md:grid md:grid-cols-3 gap-8">
            <div>

              <Form.Item
                label="First Name"
                name="firstname"
                rules={[rule]}
              >
                <Input placeholder="firstname" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[rule]}
              >
                <Input placeholder="test@test.com" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[rule]}
              >
                <Input
                  placeholder="Address"
                />
              </Form.Item>

              <Form.Item
                label="District"
                name="district"
                rules={[rule]}
              >
                <Input
                  placeholder="Distric"
                />
              </Form.Item>

              <Form.Item
                label="Teacher"
                name="teacher"
                rules={[rule]}
              >
                <Select options={teachers.map((t) => ({ label: `${t.firstname} ${t.lastname}`, value: `${t.firstname} ${t.lastname}` }))} />
              </Form.Item>

            </div>


            <div>
              <Form.Item
                label="Lastname"
                name="lastname"
                rules={[rule]}
              >
                <Input type="text" placeholder='Lastname' />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[rule]}
              >
                <Input type="text" placeholder='12345677809' />
              </Form.Item>


              <Form.Item
                label="Country"
                name="country"
                rules={[rule]}
              >
                <Input type="text" placeholder='12345677809' />
              </Form.Item>

              <Form.Item
                label="City"
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
                label='Birthdate'
                name='birth_date'
                rules={[rule]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                label='School'
                name='school'
                rules={[rule]}
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item
                label='Level'
                name='level'
                rules={[rule]}
              >
                <Select options={LEVELS} />
              </Form.Item>

            </div>

          </div>
          <Divider orientation="left">Tutor Information</Divider>
          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
              <Form.Item
                label="Tutor"
                name="tutor"
                rules={[rule]}
              >
                <Input placeholder="tutor" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="tutor_address"
                rules={[rule]}
              >
                <Input placeholder="Address" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="tutor_occupation"
                name="tutor_occupation"
                rules={[rule]}
              >
                <Input placeholder="tutor_occupation" />
              </Form.Item>
              <Form.Item
                label="tutor_district"
                name="tutor_district"
                rules={[rule]}
              >
                <Input placeholder="tutor_district" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="tutor_phone"
                name="tutor_phone"
                rules={[rule]}
              >
                <Input placeholder="tutor_phone" />
              </Form.Item>
            </div>
          </div>
          <Divider>Grupos</Divider>
          <Button className="col-start-2" loading={loading} htmlType="submit">
            {action}
          </Button>
        </Form>
      </Card>
    </div >
  )
}
