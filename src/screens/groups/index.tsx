import { Button, Card, Checkbox, Divider, Form, Select, Table, TableProps, TimePicker } from 'antd'
import { createSchemaFieldRule } from 'antd-zod'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import moment from 'moment'
import { z } from 'zod'

import { useDataContext } from '../../context/data'
import { DAYS_OF_WEEK } from '../../constant/days_of_week'
import { groupSchema } from '../../libs/schemas/groups'
import { createGroup } from '../../api/groups'
import { LEVELS } from '../../constant/levels'
import { GROUPS } from '../../constant/groups'


const { useForm } = Form;
const rule = createSchemaFieldRule(groupSchema);
type UserFormValue = z.infer<typeof groupSchema>;

const columns: TableProps<any>['columns'] = [
  { title: 'Grupo', dataIndex: 'group', key: 'group' },
  { title: 'Nivel', dataIndex: 'level', key: 'nivel' },
  { title: 'Profesor/a', dataIndex: 'teacher', key: 'teacher' },
  { title: 'Hora de inicio', dataIndex: 'start_date', key: 'start_date', render: (_, record) => moment(record.start_date).format('h:mm A') },
  { title: 'Hora de finalización', dataIndex: 'end_date', key: 'end_date', render: (_, record) => moment(record.end_date).format('h:mm A') },
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
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [form] = useForm()
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const { Option } = Select;

  useEffect(() => {
    if (selectAll) {
      // Si el checkbox "Todos" está marcado, selecciona todos los profesores
      const allTeachersIds = teachers.map(teacher => teacher._id);
      setSelectedTeachers(allTeachersIds);
    } else {
      // Si el checkbox "Todos" no está marcado, vacía la selección de profesores
      setSelectedTeachers([]);
    }
  }, [selectAll, teachers]);

  const onSubmit = (data: UserFormValue) => {
    setLoading(true)
    console.log({
      ...data,
      group: `${data.group}${data.number}`,
      end_date: data.end_date.toString(),
      start_date: data.start_date.toString(),
    })
    createGroup(data)
      .then(({ data }) => {
        console.log(data)
        toast.success('Grupo creado con exito')
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }




  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allTeachersIds = teachers.map(teacher => teacher._id);
    setSelectedTeachers(selectAll ? allTeachersIds : []);
    // Aquí podrías realizar alguna acción con la lista de profesores
    // Por ejemplo, si tienes una función para manejar la selección de todos los profesores:
    // handleSelectAllTeachers(selectAll);
  };

  const handleTeacherSelectChange = (selectedValues : any) => {
    setSelectedTeachers(selectedValues);
  };


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
              <Select
                placeholder="Seleccionar un nivel"
                options={LEVELS}
              />
            </Form.Item>
            <Form.Item label='Profesor/a' name='teacher'>
              <Select
                placeholder="Seleccionar un profe"
                options={teachers.map(({ firstname, lastname }) => ({ label: `${firstname} ${lastname}`, value: `${firstname} ${lastname}` }))}
              />
            </Form.Item>
            <Form.Item label="Grupo">
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
            <Divider>Horarios</Divider>
            <Form.Item label='Hora de inicio' name='start_date'>
              <TimePicker placeholder='00:00 AM' className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Hora de finalización' name='end_date'>
              <TimePicker placeholder='00:00 PM' className='w-full' format='h:mm A' />
            </Form.Item>
            <Form.Item label='Dias' name='days'>
              <Checkbox.Group options={DAYS_OF_WEEK.map((d) => d)} />
            </Form.Item>
            <Button block loading={loading} htmlType='submit'>Cargar Informacíon</Button>
          </Form>
        </Card>
      </div>
      <div className='col-span-2'>
        <h1 className="text-2xl text-center mb-4">Seleccionar filtro</h1>
        <div className="flex justify-center space-x-4 items-center mb-4">
          <Checkbox
            checked={selectAll}
            onChange={handleSelectAll}
            style={{ borderRadius: '9999px' }}>Todos</Checkbox>
          <Checkbox style={{ borderRadius: '9999px' }}>Nivel</Checkbox>
          <Checkbox style={{ borderRadius: '9999px' }}>Profesora</Checkbox>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Elegir uno"
            value={selectedTeachers}
            onChange={handleTeacherSelectChange}
          >
            {teachers.map(teacher => (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.firstname} {teacher.lastname}
              </Option>
            ))}
          </Select>
        </div>
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
