import { Card, Form, Input, Table } from 'antd'
import { useState } from 'react'

import { PAYMENT_COLUMNS } from './constants/payment_columns'
import TeacherSelect from '../../components/teacher-select'
import { useGroupContext } from '../../context/group'
import { getPaymentById } from '../../api/payments'

export const BillingTeachersScreen = () => {
  const { groups, handleFilterChange } = useGroupContext()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const handleSelectTeacher = (value: string) => {
    setLoading(true)
    console.log(value)
    getPaymentById(value)
      .then(({ data }) => {
        console.log(data.results, 'data')
        setData(data.results)
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
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <Table
            className="col-span-1 md:col-span-1"
            columns={PAYMENT_COLUMNS}
            dataSource={data}
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
