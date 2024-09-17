import { Button, Card, Checkbox, Divider, Form, Input, Select, Table, TableProps, TimePicker } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import moment from 'moment';
import { z } from 'zod';

import { DAYS_OF_WEEK } from '../../constant/days_of_week';
import { useTeacherContext } from '../../context/teacher';
import { groupSchema } from '../../libs/schemas/groups';
import { createGroup } from '../../api/groups';
import { LEVELS } from '../../constant/levels';
import { GROUPS } from '../../constant/groups';
import { useGroupContext } from '../../context/group';

const { useForm } = Form;
const rule = createSchemaFieldRule(groupSchema);
type UserFormValue = z.infer<typeof groupSchema>;

const columns: TableProps<any>['columns'] = [
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

export const GroupsScreen = () => {
  const { teachers } = useTeacherContext();
  const { groups, limit, loading, handleFilterChange, page, total } = useGroupContext()
  const [load, setLoad] = useState(loading);
  const [form] = useForm();


  const onSubmit = (data: UserFormValue) => {
    setLoad(true);
    createGroup(data)
      .then(({ data }) => {
        console.log(data);
        toast.success('Grupo creado con exito');
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    handleFilterChange()
  }, [])

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
            <Form.Item label='Nivel' name='level' rules={[rule]}>
              <Select
                placeholder="Seleccionar un nivel"
                options={LEVELS}
              />
            </Form.Item>
            <Form.Item label='Profesor/a' name='teacher' rules={[rule]}>
              <Select
                placeholder="Seleccionar un profe"
                options={teachers.map(({ firstname, lastname }) => ({ label: `${firstname} ${lastname}`, value: `${firstname} ${lastname}` }))}
              />
            </Form.Item>
            <Form.Item label="Grupo" rules={[rule]}>
              <Form.Item
                name="group"
                noStyle
                rules={[{ required: true, message: 'Seleccione una letra' }]}
              >
                <Select
                  options={GROUPS}
                  placeholder="Seleccionar un grupo"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Capacidad maxima de estudiantes"
            >
              <Input 
              placeholder='Coloca la cantidad de estudiantes'
              type='number'
              />
            </Form.Item>
            <Divider>Horarios</Divider>
            <Form.Item label='Hora de inicio' name='start_date'>
              <TimePicker placeholder='00:00 AM' className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Hora de finalización' name='end_date'>
              <TimePicker placeholder='00:00 PM' className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Dias' name='days'>
              <Checkbox.Group options={DAYS_OF_WEEK.map((d: any) => d)} />
            </Form.Item>
            <Button block loading={load} htmlType='submit'>Cargar Informacíon</Button>
          </Form>
        </Card>
      </div>
      <div className='col-span-2'>
        <Table
          size='small'
          dataSource={groups}
          columns={columns}
          loading={loading}
          scroll={{ x: 1800 }}
          rowKey="_id"
          pagination={{
            className: 'section-not-print px-4',
            rootClassName: '',
            locale: {
              items_per_page: 'x pág.',
            },
            total,
            current: page,
            pageSize: limit,
            onChange: (page, pageSize) => console.log([["page", page.toString()], ["limit", pageSize.toString()]]),
            showSizeChanger: true
          }}
        />
      </div>
    </div>
  );
};
