import { Breadcrumb, Button, Card, Divider, Form, Input } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createSchemaFieldRule } from 'antd-zod';
import { FaArrowLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { TeacherSchema } from '../../libs/schemas/teacher';
import { createTeacher, getTeacher, updateTeacher } from '../../api/teacher';
import styled from 'styled-components';
import { useTeacherContext } from '../../context/teacher'; // Asegúrate de importar el contexto

const { useForm } = Form;
const rule = createSchemaFieldRule(TeacherSchema);
type UserFormValue = z.infer<typeof TeacherSchema>;

export const TeacherDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { fetchTeacher } = useTeacherContext(); // Obtener la función fetchTeacher del contexto

  const [form] = useForm();
  const id = params.id === 'new' ? 'new' : params.id!;
  const action = id !== 'new' ? "Guardar Cambios" : "Crear Profesor";
  const message = id !== 'new' ? 'Éxito en actualizar el profesor!' : 'Éxito en cargar el profesor!';

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      if (id !== 'new') {
        const { data: response } = await updateTeacher(id, data);
        console.log(response);
        toast.success(message);
      } else {
        const { data: response } = await createTeacher(data);
        console.log(response);
        toast.success(message);
      }
      await fetchTeacher({ page: 1, limit: 10 }); // Recargar la lista de profesores
      navigate('/teachers'); // Navegar a la lista de profesores
    } catch (err) {
      console.log(err);
      toast.error('¡Ups! Algo salió mal!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== 'new') {
      getTeacher(id)
        .then(({ data }) => {
          console.log(data); // Asegúrate de que data tenga la estructura esperada
          form.setFieldsValue(data.response || data); // Cargar los datos del profesor en el formulario
        })
        .catch((error) => {
          console.error(error); // Cambié a console.error para mejor visualización de errores
          toast.error('Error al cargar los datos del profesor.');
        });
    }
  }, [id, form]);

  const breadcrumbItems = [
    { title: 'Inicio', href: '/' },
    { title: 'Profesores', href: '/teachers' },
    { title: 'Detalles', href: '/teachers/:id' }, // Asegúrate de reemplazar :id con el ID real
  ];

  const BlueCalendarInput = styled(Input)`
    &::-webkit-calendar-picker-indicator {
      filter: invert(8%) sepia(98%) saturate(7075%) hue-rotate(248deg) brightness(89%) contrast(143%);
    }
  `;

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <Breadcrumb className='section-not-print mb-4'>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Profesor</Breadcrumb.Item>
        <Breadcrumb.Item>{id}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center justify-between mb-6" id='section-not-print'>
        <Link className="flex gap-2 items-center" to='/teachers'>
          <FaArrowLeft />
          Volver
        </Link>
        <div className="flex items-center">
          <Button onClick={() => window.print()}>Imprimir</Button>
        </div>
      </div>
      <Card>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmit}
        >
          <Divider orientation="left">Información del Profesor</Divider>

          <div className="md:grid md:grid-cols-3 gap-8">
            <div>
              <Form.Item label="Nombre" name="firstname" rules={[rule]}>
                <Input placeholder="nombre" />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[rule]}>
                <Input placeholder="test@test.com" />
              </Form.Item>

              <Form.Item label="Dirección" name="address" rules={[rule]}>
                <Input placeholder="Dirección" />
              </Form.Item>

              <Form.Item label="Distrito" name="district" rules={[rule]}>
                <Input placeholder="Distrito" />
              </Form.Item>
            </div>

            <div>
              <Form.Item label="Apellido" name="lastname" rules={[rule]}>
                <Input type="text" placeholder='Apellido' />
              </Form.Item>

              <Form.Item label="Teléfono" name="phone" rules={[rule]}>
                <Input type="text" placeholder='12345677809' />
              </Form.Item>

              <Form.Item label="Ciudad" name="city" rules={[rule]}>
                <Input type="text" placeholder='Ciudad' />
              </Form.Item>
            </div>

            <div>
              <Form.Item label='DNI' name='dni' rules={[rule]}>
                <Input type="text" />
              </Form.Item>

              <Form.Item
                label='Fecha de Nacimiento'
                name='birth_date'
                rules={[rule]}
              > 
                <BlueCalendarInput type="date" />
              </Form.Item>

              <Form.Item
                label='Fecha de Inicio'
                name='start_date'
                rules={[rule]}
              >
                <BlueCalendarInput type="date" />
              </Form.Item>
            </div>
          </div>

          <Button className="col-start-2" loading={loading} htmlType="submit">
            {action}
          </Button>
        </Form>
      </Card>
    </div>
  );
};
