import { Card, Table } from "antd"
import { DAYS_OF_WEEK } from "../../constant/days_of_week";
import moment from "moment";
import StudentSelect from "../../components/student-select";

export const BillingScreen = () => {

  const columns = [
    {
      title: 'Grupo',
      dataIndex: 'groups',
      key: 'groups',
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Profesor/a',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Hora inicio',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Hora fin',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    // {
    //   dataIndex: 'days',
    //   key: 'days',
    //   width: 100,
    //   children: DAYS_OF_WEEK.map(({ value }: any) => ({
    //     title: value,
    //     dataIndex: value,
    //     key: value,
    //     width: 20,
    //     render: (_: any, record: any) => record.days.includes(value) ? 'X' : ''
    //   }))
    // },
  ];

  const columns1 = [
    {
      title: 'Mes de pago',
      dataIndex: '_',
      key: '_',
    },
    {
      title: 'Pago',
      dataIndex: 'pay_month',
      key: 'pay_month',
    },
    {
      title: 'deauda',
      dataIndex: 'deuda_month',
      key: 'deuda_month',
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

  const handleGetUserGroup = ()=> {
    
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-4">
        <Card title="Alumno" className="col-span-4">
          <StudentSelect className="col-span-4" onChange={(value: string) => console.log([['teacher', value]])} />
        </Card>
        <Card title="Grupo" className="col-span-4">
          <Table dataSource={[]} columns={columns2} />
        </Card>
        <Card title='Detalle del recibo' className="col-span-4">
          <div className="grid gap-4 grid-cols-4">
            <Table className="col-start-1" dataSource={[]} columns={columns1} />
            <Table className="col-start-2 col-span-3" dataSource={[]} columns={columns} />
          </div>
        </Card>
      </div>
    </div>
  )
}
