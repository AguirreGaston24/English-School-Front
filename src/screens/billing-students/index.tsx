import { Button, Card, Form, Input, Select, Table } from "antd"
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { toast } from "sonner";

import StudentSelect from "../../components/student-select";
import { useGroupContext } from "../../context/group";
import { getStudent } from "../../api/students";
import { createbilling, getBilling } from "../../api/billing";
import { MONTHS } from "../../constant/months";
import { BECAS } from "../../constant/becas";
import { GROUP_COLUMNS } from "./constants/group_columns";
import { PAY_COLUMNS } from "./constants/pay_columns";
import { BILLING_COLUMNS } from "./constants/billing_columns";
import { IStudent } from "../../interfaces/student";

export const BillingStudentScreen = () => {
  const { groups, loading, handleFilterChange, } = useGroupContext()
  const [billings, setBillings] = useState<any>([])
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [form] = useForm()

  const handleGetUserGroup = (id: string) => {
    getStudent(id)
      .then(({ data }) => {
        const { phone, _id } = data.response as IStudent
        setPhone(phone)
        setStudentId(_id)
        handleFilterChange([['group', data.response.group]])
      })
      .catch((error) => {
        console.log(error)
      })
    getBilling(id)
      .then(({ data }) => {
        console.log(data)
        setBillings(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSubmitBilling = (value: any) => {
    createbilling({
      ...value,
      studentId
    })
      .then(({ data }) => {
        getBilling(studentId)
          .then(({ data }) => {
            console.log(data)
            setBillings(data)
          })
          .catch((error) => {
            console.log(error)
          })
        toast.success('Facturación creada con exito!.')
      })
      .catch((error) => {
        console.log(error)
        toast.success('Error al crear la facturacion!.')
      })
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Historial sobre pagos de alumnos</h2>
        <Card title="Seleccionar un alumno" className="col-span-1 lg:col-span-4 p-5">
          <Form
            layout="vertical"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Form.Item
                label='Lista de Alumnos'
              >
                <StudentSelect className="w-full" onChange={(_: string, value: any) => handleGetUserGroup(value.key)} />
              </Form.Item>
              <Form.Item
                label='N° de telefono:'
              >
                <Input placeholder="N° de telefono" value={phone} onChange={({ target }) => setPhone(target.value)} />
              </Form.Item>
              <div className="flex items-center justify-center">
                <Button type="primary" className="w-full md:w-auto">
                  Enviar Recibo
                </Button>
              </div>
            </div>
          </Form>
        </Card>
        <Card title="Informacion del alumno seleccionado" className="col-span-1 lg:col-span-4">
          <Table
            loading={loading}
            dataSource={groups}
            columns={GROUP_COLUMNS}
            scroll={{ x: 800 }}
          />
        </Card>
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <Table
              className="col-span-1 md:col-span-1"
              scroll={{ x: 200 }}
              pagination={{
                pageSize: 20
              }}
              dataSource={MONTHS.map((month: any) => ({
                month: month.label,
                pay_month: billings.some((billing: any) => billing.month === month.value && billing.pay_month),
                deuda_month: billings.some((billing: any) => billing.month === month.value && !billing.pay_month),
                studentId: billings.find((billing: any) => billing.month === month.value)?.studentId,
              }))}
              columns={PAY_COLUMNS} />
            <Table
              className="col-span-1 md:col-span-3"
              dataSource={billings}
              scroll={{ x: 800 }}
              columns={BILLING_COLUMNS}
            />
          </div>
        </Card>
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Registrar pagos de alumnos</h2>
        <Card className="col-span-1 lg:col-span-4 md:p-5">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onSubmitBilling}
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Form.Item
                label="N° de recibo"
                name="receiptNumber"
              >
                <Input type="number" placeholder="0000000" />
              </Form.Item>
              <Form.Item
                label="Mes a pagar:"
                name="month"
              >
                <Select placeholder="Seleccionar un mes" options={MONTHS} />
              </Form.Item>
              <Form.Item
                label="Tipo de beca:"
                name="scholarshipType"
              >
                <Select placeholder="Selecciona una beca" options={BECAS} />
              </Form.Item>
              <Form.Item
                label="Forma de pago:"
                name="scholarshipType2"
              >
                <Select placeholder="Selecciona una forma de pago" options={BECAS} />
              </Form.Item>

              <Form.Item
                label="Valor de la cuota:"
                name="amount"
              >
                <Input type="number" placeholder="$00.0" />
              </Form.Item>
              <Form.Item
                label="Entrego:"
                name="feeAmount"
              >
                <Input placeholder="$00.0" />
              </Form.Item>
              <Form.Item
                label="Debe:"
                name="debeAmount"
              >
                <Input type="number" placeholder="$00.0" />
              </Form.Item>
              <div className="flex w-full justify-center md:col-span-2">
                <Button htmlType="submit" size="large" className="text-white" type="primary">
                  Guardar
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}
