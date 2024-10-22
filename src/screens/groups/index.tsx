import { Button, Card, Checkbox, Divider, Form, Input, Select, Table, TimePicker, Modal, Tooltip } from 'antd'; // Asegúrate de incluir Tooltip aquí
import { createSchemaFieldRule } from 'antd-zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import moment from 'moment';
import { z } from 'zod';
import { IGroup } from '../../interfaces/group';
import { DAYS_OF_WEEK } from '../../constant/days_of_week';
import { useTeacherContext } from '../../context/teacher';
import { groupSchema } from '../../libs/schemas/groups';
import { createGroup, updateGroup, deleteGroup, getAllGroups } from '../../api/groups';
import { LEVELS } from '../../constant/levels';
import { GROUPS } from '../../constant/groups';
import { ITeacher } from '../../interfaces/teacher';
import { FaTrash } from 'react-icons/fa'; // Importa los iconos aquí
import { FaPencil } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

const { useForm } = Form;
const rule = createSchemaFieldRule(groupSchema);
type UserFormValue = z.infer<typeof groupSchema>;

const columns = (onEdit: (group: any) => void, onDelete: (id: string) => void) => [
  { title: 'Grupo', dataIndex: 'group', key: 'group' },
  { title: 'Nivel', dataIndex: 'level', key: 'nivel' },
  {
    title: 'Profesor/a',
    dataIndex: 'teacher_id',
    key: 'teacher_id',
    render: (_: any, { teacher_id }: { teacher_id?: ITeacher }) => 
      teacher_id ? `${teacher_id.firstname} ${teacher_id.lastname}` : 'No asignado'
  },
  { title: 'Hora de inicio', dataIndex: 'start_date', key: 'start_date', render: (_: any, record: any) => moment(record.start_date).format('h:mm A') },
  { title: 'Hora de finalización', dataIndex: 'end_date', key: 'end_date', render: (_: any, record: any) => moment(record.end_date).format('h:mm A') },
  {
    title: 'Capacidad máxima',
    dataIndex: 'capacity',
    key: 'capacity',
  },
  {
    dataIndex: 'days',
    key: 'days',
    children: DAYS_OF_WEEK.map(({ value }) => ({
      title: value,
      dataIndex: value,
      key: value,
      render: (_: any, record: any) => {
        return Array.isArray(record.days) && record.days.includes(value) ? 'X' : '';
      },
    }))
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_: any, record: any) => (
      <>
        <Tooltip title="Editar">
          <Button
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            type="link"
            shape="circle"
            icon={<FaPencil size={18} />}
            onClick={() => onEdit(record)}
          />
        </Tooltip>

        <Tooltip title="Eliminar">
          <Button
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            type="link"
            shape="circle"
            icon={<FaTrash size={18} />}
            onClick={() => onDelete(record._id)}
          />
        </Tooltip>
      </>
    )
  }
];

export const GroupsScreen = () => {
  const { teachers } = useTeacherContext();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [load, setLoad] = useState(false);
  const [form] = useForm();
  const [editingGroup, setEditingGroup] = useState<IGroup | null>(null);
  const generateUniqueId = () => uuidv4();

  const loadGroups = async () => {
    setLoad(true);
    try {
      const response = await getAllGroups({});
      console.log(response.data);
  
      if (response.data && Array.isArray(response.data.response)) {
        const formattedGroups = response.data.response.map((group: any) => ({
          ...group,
          days: group.days || [],
          capacity: group.capacity || 0 // Asegúrate de incluir la capacidad aquí
        }));
        setGroups(formattedGroups);
      } else {
        console.error('Se esperaba un array, pero se recibió:', response.data);
        setGroups([]);
        toast.error('Error al cargar los grupos');
      }
    } catch (error) {
      console.error('Error al cargar los grupos:', error);
      toast.error('Error al cargar los grupos');
    } finally {
      setLoad(false);
    }
  };

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoad(true);
      const formattedData = {
        ...data,
        _id: editingGroup ? editingGroup._id : generateUniqueId(), // Genera un ID único si es un nuevo grupo
        name: data.group,
        start_date: moment(data.start_date).format(),
        end_date: moment(data.end_date).format(),
        studentCount: 0, // O el valor que necesites
      };

      const groupExists = groups.some(group => group.group === data.group && group._id !== editingGroup?._id);
      
      if (groupExists) {
        toast.error('Error: Grupo ya existente');
        return; // Detén la ejecución si el grupo ya existe
      }

      if (editingGroup) {
        const updatedGroup = await updateGroup(editingGroup._id, formattedData);
        if (updatedGroup.data) {
          setGroups((prev) => prev.map((g) => (g._id === editingGroup._id ? updatedGroup.data : g)));
          toast.success('Grupo actualizado con éxito');
        } else {
          toast.error('Error al actualizar el grupo');
        }
      } else {
        const newGroup = await createGroup(formattedData);
        if (newGroup.data) {
          setGroups((prev) => [...prev, newGroup.data]);
          toast.success('Grupo creado con éxito');
        } else {
          toast.error('Error al crear el grupo');
        }
      }

      form.resetFields();
      setEditingGroup(null);
      
      await loadGroups(); // Refresca la tabla

    } catch (error) {
      console.error('Error al guardar el grupo:', error);
      toast.error('Error al guardar el grupo');
    } finally {
      setLoad(false);
    }
  };

  const onDelete = (id: string) => {
    Modal.confirm({
      title: 'Eliminar Grupo',
      content: '¿Estás seguro de que deseas eliminar este grupo?',
      onOk: async () => {
        try {
          await deleteGroup(id);
          setGroups((prev) => prev.filter((group) => group._id !== id));
          toast.success('Grupo eliminado con éxito');
        } catch (error) {
          console.error('Error al eliminar el grupo:', error);
          toast.error('Error al eliminar el grupo');
        }
      }
    });
  };
  
  const loadEditingGroup = (group: IGroup) => {
    setEditingGroup(group);
    form.setFieldsValue({
      level: group.level,
      teacher_id: group.teacher_id?._id,
      group: group.group,
      capacity: group.capacity,
      start_date: moment(group.start_date),
      end_date: moment(group.end_date),
      days: group.days
    });
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div className='grid grid-cols-1 gap-y-6 lg:gap-x-6 lg:grid-cols-3'>
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
            <Form.Item label='Profesor/a' name='teacher_id' rules={[rule]}>
              <Select
                placeholder="Seleccionar un profe"
                options={teachers.map(({ firstname, lastname, _id }) => ({ label: `${firstname} ${lastname}`, value: _id }))} 
              />
            </Form.Item>
            <Form.Item label="Grupo" name="group" rules={[{ required: true, message: 'Seleccione un grupo' }]}>
              <Select
                options={GROUPS}
                placeholder="Seleccionar un grupo"
              />
            </Form.Item>
            <Form.Item label="Capacidad máxima de estudiantes" name="capacity" rules={[{ required: true, message: 'Coloca la cantidad de estudiantes' }]}>
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
              <TimePicker placeholder='00:00 AM' className='w-full' format='h:mm A' />
            </Form.Item>
            <Divider>Disponibilidad</Divider>
            <Form.Item label="Días" name="days">
              <Checkbox.Group>
                {DAYS_OF_WEEK.map(({ value }) => (
                  <Checkbox key={value} value={value}>
                    {value}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <Button
                loading={load}
                type='primary'
                htmlType='submit'
                className='w-full'
              >
                {editingGroup ? 'Actualizar' : 'Crear'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <div className='col-start-1 lg:col-span-2'>
        <Card>
          <Table
            loading={load}
            columns={columns(loadEditingGroup, onDelete)}
            dataSource={groups}
            pagination={{ pageSize: 10 }}
            rowKey='_id'
          />
        </Card>
      </div>
    </div>
  );
};

export default GroupsScreen;