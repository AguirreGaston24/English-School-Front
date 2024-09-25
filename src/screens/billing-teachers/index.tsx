import { Card, Descriptions, Form, Input, Table } from 'antd'
import { useState } from 'react'

import { BILLING_COLUMNS } from '../billing-students/constants/billing_columns'
import { PAYMENT_COLUMNS } from './constants/payment_columns'
import TeacherSelect from '../../components/teacher-select'
import { getPaymentById } from '../../api/payments'
import { ITeacher } from '../../interfaces/teacher'

export const BillingTeachersScreen = () => {
  const [loading, setLoading] = useState(false)
  const [teacher, setTeacher] = useState<ITeacher | undefined>()
  const [groups, setGroups] = useState([])
  const [billings, setBillings] = useState([])

  const handleSelectTeacher = (value: string) => {
    setLoading(true)
    console.log(value)
    getPaymentById(value)
      .then(({ data }) => {
        console.log(data, 'data')
        setTeacher(data.teacher)
        setGroups(data.groups)
        setBillings(data.billings)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Historial sobre pagos de profesores</h2>
        <Card title="Seleccionar un Profesor" className="col-span-1 lg:col-span-4 p-5">
          <Form
            layout="vertical"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                label='Lista de Profesores'
              >
                <TeacherSelect className="w-full" onChange={(_: string, value: any) => handleSelectTeacher(value.key)} />
              </Form.Item>
              <Form.Item
                label='Filtro por grupo'
              >
                <Input placeholder="G1" value={''} onChange={({ target }) => console.log(target.value)} />
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card title="Detalles del Profesor" className="col-span-1 lg:col-span-4 p-5">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Nombre">
              {teacher?.firstname} {teacher?.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{teacher?.email}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{teacher?.phone}</Descriptions.Item>
            <Descriptions.Item label="Ciudad">{teacher?.city}</Descriptions.Item>
            <Descriptions.Item label="Dirección">{teacher?.address}</Descriptions.Item>
            <Descriptions.Item label="Distrito">{teacher?.district}</Descriptions.Item>
            <Descriptions.Item label="DNI">{teacher?.dni}</Descriptions.Item>
            <Descriptions.Item label="Fecha de Nacimiento">
              {teacher?.birth_date ? new Date(teacher.birth_date).toLocaleDateString() : '--/--/--'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <Table
            className="col-span-1 md:col-span-3"
            dataSource={billings}
            scroll={{ x: 800 }}
            columns={BILLING_COLUMNS}
          />
        </Card>
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <Table
            className="col-span-1 md:col-span-1"
            columns={PAYMENT_COLUMNS}
            dataSource={groups}
            scroll={{ x: 200 }}
            loading={loading}
            pagination={{
              pageSize: 20
            }}
          />
        </Card>
      </div>
    </div>
  )
}
