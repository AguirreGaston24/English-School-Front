import { Button, Card, Form, Input, Select, Table, Tag } from "antd"
import { DAYS_OF_WEEK } from "../../constant/days_of_week";
import moment from "moment";
import StudentSelect from "../../components/student-select";
import { useGroupContext } from "../../context/group";
import { getStudent } from "../../api/students";
import { getBilling } from "../../api/billing";
import { useState } from "react";
import { MONTHS } from "../../constant/months";
import { BECAS } from "../../constant/becas";
import { z } from "zod";

export const BillingStudentScreen = () => {
  const { groups, handleFilterChange, loading } = useGroupContext()
  const [billings, setBillings] = useState<any>([])
  const [selectedMonth, setSelectedMonth] = useState(null);

  const formSchema = z.object({
    email: z.string({ required_error: 'El correo es requerido' }).email({ message: "Inserte un correo valido." }),
    password: z.string({ required_error: 'La contraseña es requerida' }),
  });

  const columns = [
    {
      title: 'N° RECIBO',
      dataIndex: 'receiptNumber',
      key: 'receiptNumber',
    },
    // {
    //   title: 'PAGO',
    //   dataIndex: 'paid',
    //   key: 'paid',
    //   render: (paid: boolean) => (
    //     <Tag color={paid ? 'green' : 'red'}>
    //       {paid ? 'Paid' : 'Not Paid'}
    //     </Tag>
    //   ),
    // },
    {
      title: 'FECHA DE PAGO',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (_: any, record: any) => moment(record.paymentDate).format('DD-MM-YYYY')
    },
    {
      title: 'TIPO DE BECA',
      dataIndex: 'scholarshipType',
      key: 'scholarshipType',
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },

  ];

  const columns1 = [
    {
      title: 'Mes de pago',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Pago',
      dataIndex: 'pay_month',
      key: 'pay_month',
      render: (pay_month: any, record: any) => (
        <Tag
          color={pay_month ? 'green' : 'red'}
        // onClick={() => handleUpdatePaymentStatus(record.studentId, record.month, record.year, !pay_month)}
        >
          {pay_month ? 'SI' : 'NO'}
        </Tag>
      ),
    },
    {
      title: 'Debe',
      dataIndex: 'deuda_month',
      key: 'deuda_month',
      render: (pay_month: any, record: any) => (
        <Tag
          color={pay_month ? 'green' : 'red'}
        // onClick={() => handleUpdatePaymentStatus(record.studentId, record.month, record.year, !pay_month)}
        >
          {pay_month ? 'SI' : 'NO'}
        </Tag>
      ),
    },
  ];

  const columns2 = [
    { title: 'Grupo', dataIndex: 'group', key: 'group' },
    { title: 'Nivel', dataIndex: 'level', key: 'nivel' },
    { title: 'Profesor/a', dataIndex: 'teacher', key: 'teacher' },
    { title: 'Hora de inicio', dataIndex: 'start_date', key: 'start_date', render: (_: any, record: any) => moment(record.start_date).format('h:mm A') },
    { title: 'Hora de finalización', dataIndex: 'end_date', key: 'end_date', render: (_: any, record: any) => moment(record.end_date).format('h:mm A') },
    {
      dataIndex: 'days',
      key: 'days',
      width: 100,
      children: DAYS_OF_WEEK.map(({ value }: any) => ({
        title: value,
        dataIndex: value,
        key: value,
        width: 20,
        render: (_: any, record: any) => record.days.includes(value) ? 'X' : ''
      }))
    },
  ];

  const handleGetUserGroup = (value: string) => {
    console.log(value)
    getStudent(value)
      .then(({ data }) => {
        handleFilterChange([['group', data.response.group]])
      })
      .catch((error) => {
        console.log(error)
      })
    getBilling(value)
      .then(({ data }) => {
        console.log(data)
        setBillings(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const months = [
    { title: 'Enero', key: 'JANUARY' },
    { title: 'Febrero', key: 'FEBRUARY' },
    { title: 'Marzo', key: 'MARCH' },
    { title: 'Abril', key: 'APRIL' },
    { title: 'Mayo', key: 'MAY' },
    { title: 'Junio', key: 'JUNE' },
    { title: 'Julio', key: 'JULY' },
    { title: 'Agosto', key: 'AUGUST' },
    { title: 'Septiembre', key: 'SEPTEMBER' },
    { title: 'Octubre', key: 'OCTOBER' },
    { title: 'Noviembre', key: 'NOVEMBER' },
    { title: 'Diciembre', key: 'DECEMBER' },
  ];




  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Historial sobre pagos de alumnos</h2>
        <Card title="Seleccionar un alumno" className="col-span-1 lg:col-span-4 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-center">
              <StudentSelect className="w-full" onChange={(_: string, value: any) => handleGetUserGroup(value.key)} />
            </div>
            <div className="flex items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">N° de telefono:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="N° de telefono" />
            </div>
            <div className="flex items-center justify-center">
              <Button type="primary" className="w-full md:w-auto">
                Enviar Recibo
              </Button>
            </div>
          </div>
        </Card>
        <Card title="Informacion del alumno seleccionado" className="col-span-1 lg:col-span-4">
          <Table
            loading={loading}
            dataSource={groups}
            columns={columns2}
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
              dataSource={months.map((month: any) => ({
                month: month.title,
                pay_month: billings.some((billing: any) => billing.month === month.key && billing.pay_month),
                deuda_month: billings.some((billing: any) => billing.month === month.key && !billing.pay_month),
                studentId: billings.find((billing: any) => billing.month === month.key)?.studentId,
              }))}
              columns={columns1} />
            <Table
              className="col-span-1 md:col-span-3"
              dataSource={billings}
              scroll={{ x: 800 }}
              columns={columns}
            />
          </div>
        </Card>
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">Registrar pagos de alumnos</h2>
        <Card className="col-span-1 lg:col-span-4 md:p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">N° de recibo:</h2>
              <Form.Item>
              <Input className="w-2/3 md:w-3/4" placeholder="N° de recibo" />
              </Form.Item>
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Mes a pagar:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Seleccionar un mes" options={MONTHS} />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Tipo de beca:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Selecciona una beca" options={BECAS} />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Forma de pago:</h2>
              <Select className="w-2/3 md:w-3/4" placeholder="Selecciona una forma de pago" options={BECAS} />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Valor de la cuota:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor de la cuota" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Entrego:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor que entrego" />
            </div>
            <div className="flex w-full items-center">
              <h2 className="md:text-sm w-1/3 md:w-1/4">Debe:</h2>
              <Input className="w-2/3 md:w-3/4" placeholder="Ingresa el valor que debe" />
            </div>
            <div className="flex w-full justify-center md:col-span-2">
              <Button size="large" className="text-white" type="primary">
                Guardar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
