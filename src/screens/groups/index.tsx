import { Button, Card, Checkbox, Divider, Form, Select, Table, TableProps, TimePicker } from 'antd'
import { createSchemaFieldRule } from 'antd-zod'
import { toast } from 'sonner'
import moment from 'moment'
import { z } from 'zod'

import { useDataContext } from '../../context/data'
import { DAYS_OF_WEEK } from '../../constant/days_of_week'
import { groupSchema } from '../../libs/schemas/groups'
import { createGroup } from '../../api/groups'
import { LEVELS } from '../../constant/levels'

const { useForm } = Form;
const rule = createSchemaFieldRule(groupSchema);
type UserFormValue = z.infer<typeof groupSchema>;

const columns: TableProps<any>['columns'] = [
  { title: 'Group', key: 'group', render: (_, record, i) => `G${i + 1}` },
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

export const GroupsScreen = () => {
  const { teachers, groups } = useDataContext()
  const [form] = useForm()

  console.log(groups)


  const onSubmit = (data: UserFormValue) => {
    console.log({
      ...data,
      end_date: data.end_date.toString(),
      start_date: data.start_date.toString(),
    })
    createGroup(data)
      .then(({ data }) => {
        console.log(data)
        toast.success('Grupo creado con exito')
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className='grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:grid-cols-3 '>
      <div className='col-start-1'>
        <Card>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onSubmit}
          >
            <Form.Item label='Nivel' name='level'>
              <Select options={LEVELS} />
            </Form.Item>
            <Form.Item label='Profes' name='teacher'>
              <Select options={teachers.map(({ firstname, lastname }) => ({ label: `${firstname} ${lastname}`, value: `${firstname} ${lastname}` }))} />
            </Form.Item>
            <Divider>Horarios</Divider>
            <Form.Item label='Hora de inicio' name='start_date'>
              <TimePicker className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Hora de finalizacion' name='end_date'>
              <TimePicker className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Dias' name='days'>
              <Checkbox.Group options={DAYS_OF_WEEK.map((d) => d)} />
            </Form.Item>
            <Button htmlType='submit'>Cargar</Button>
          </Form>
        </Card>
      </div>
      <div className='col-span-2'>
        <Table
          size='small'
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={groups}
        />
      </div>
    </div>
  )
}
