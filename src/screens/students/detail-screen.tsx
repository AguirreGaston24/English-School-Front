import { z } from "zod";
import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom"
import { createSchemaFieldRule } from "antd-zod";

import { StudentSchema } from "../../libs/schemas/student";
import { USERS } from "../../constant/users";

const rule = createSchemaFieldRule(StudentSchema);
type UserFormValue = z.infer<typeof StudentSchema>;

const { useForm } = Form;

export const StudentDetails = () => {
  const params = useParams()
  const [form] = useForm()
  const id = params.id === 'new' ? false : params.id
  const action = id ? "Guardar Cambios" : "Crear Usuario";

  console.log(id)

  const onSubmit = async (data: UserFormValue) => {
    console.log(data)
  };


  useEffect(() => {
    if (!id) return
    const findUser = USERS.filter((user) => user.id === id)
    form.setFieldsValue(findUser[0])
    console.log(findUser)
  }, [id])


  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onSubmit}
      >
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
              <Input
                placeholder="Distric"
              />
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
              label='Group'
              name='group'
              rules={[rule]}
            >
              <Input type="text" />
            </Form.Item>
            <Button>
              {action}
            </Button>
          </div>
        </div>
      </Form>
    </div >
  )
}
