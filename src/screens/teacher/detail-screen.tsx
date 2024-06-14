import { Breadcrumb, Button, Card, Divider, Form, Input } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createSchemaFieldRule } from 'antd-zod'
import { FaArrowLeft } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { TeacherSchema } from '../../libs/schemas/teacher'
import { createTeacher, getTeacher, updateTeacher } from '../../api/teacher'

const { useForm } = Form
const rule = createSchemaFieldRule(TeacherSchema);
type UserFormValue = z.infer<typeof TeacherSchema>;

export const TeacherDetails = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const [form] = useForm()
  const id = params.id === 'new' ? 'new' : params.id!
  const action = id !== 'new' ? "Guardar Cambios" : "Crear Profe";
  const message = id !== 'new' ? 'Exito en actualizar el Profe!.' : 'Exito en cargar el Profe!.';

  console.log(id)


  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    if (id !== 'new') {
      updateTeacher(id, data)
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
      createTeacher(data)
        .then(({ data }) => {
          console.log(data)
          navigate('/teachers')
          toast.success(message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => setLoading(false))
    }
  };


  useEffect(() => {
    if (id !== 'new') return
    getTeacher(id)
      .then(({ data }) => {
        form.setFieldsValue(data.response)
        console.log(data.response)
      })
      .catch((error) => console.log(error))
      .finally(() => { })

  }, [id, form])

  return (
    <div>
      <Breadcrumb className='section-not-print mb-4'>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Teacher</Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center justify-between mb-6" id='section-not-print'>
        <Link
          className="flex gap-2 items-center"
          to='/teachers'
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
          <Divider orientation="left">StTeacher Information</Divider>

          <div className="md:grid md:grid-cols-3 gap-8">
            <div>

              <Form.Item
                label="First Name"
                name="firstname"
                rules={[rule]}
              >
                <Input placeholder="first name" />
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
            </div>


            <div>
              <Form.Item
                label="Last name"
                name="lastname"
                rules={[rule]}
              >
                <Input type="text" placeholder='Last name' />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
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
                label='start date'
                name='start_date'
                rules={[rule]}
              >
                <Input type="date" />
              </Form.Item>


            </div>

          </div>

          <Button className="col-start-2" loading={loading} htmlType="submit">
            {action}
          </Button>
        </Form>
      </Card>
    </div >
  )
}
