import { Card, Table, Tag } from "antd"
import { DAYS_OF_WEEK } from "../../constant/days_of_week";
import moment from "moment";
import StudentSelect from "../../components/student-select";
import { useGroupContext } from "../../context/group";
import { getStudent } from "../../api/students";
import { getBilling } from "../../api/billing";
import { useState } from "react";

export const BillingScreen = () => {
  const { groups, handleFilterChange, loading } = useGroupContext()
  const [billings, setBillings] = useState<any>([])


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
      <div className="grid gap-4 grid-cols-4">
        <Card title="Alumno" className="col-span-4">
          <StudentSelect className="col-span-4" onChange={(_: string, value: any) => handleGetUserGroup(value.key)} />
        </Card>
        <Card title="Grupo" className="col-span-4">
          <Table
            loading={loading}
            dataSource={groups}
            columns={columns2}
            scroll={{ x: 800 }}
          />
        </Card>
        <Card title='Detalle del recibo' className="col-span-4">
          <div className="grid gap-4 grid-cols-4">
            <Table
              className="col-start-1 col-span-4 md:col-span-1"
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
              className="col-start-1 col-span-4 md:col-start-2 md:col-span-3"
              dataSource={billings}
              scroll={{ x: 800 }}
              columns={columns}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
