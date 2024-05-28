import React from 'react';
import { Select, Form, Table, TableProps } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { z } from 'zod';
import { StudentSchema } from '../../libs/schemas/student';

const { useForm } = Form;
const rule = createSchemaFieldRule(StudentSchema);
type UserFormValue = z.infer<typeof StudentSchema>;

const alumnos = [
  { value: 'A', label: 'Grupo A' },
  { value: 'B', label: 'Grupo B' },
  { value: 'C', label: 'Grupo C' },
  // Agrega más grupos según sea necesario
];

const columns: TableProps<any>['columns'] = [
  { title: 'Alumno', dataIndex: 'student', key: 'student' },
  { title: 'Dni', dataIndex: 'Dni', key: 'Dni' },
  { title: 'Direccion', dataIndex: 'Adress', key: 'Adress' },
  { title: 'Barrio', dataIndex: 'neighborhood', key: 'neighborhood' },
];

const ListStudentsScreen = () => {
  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <Form layout="horizontal">
        <div className='flex justify-around'> 
          <Form.Item label="Filtrado por barrio" name="group" rules={[{ required: true, message: 'Seleccione una letra' }]}>
            <Select
              options={alumnos}
              placeholder="Seleccionar un grupo"
            />
          </Form.Item>
          <Form.Item label="Filtrado por escuela" name="group" rules={[{ required: true, message: 'Seleccione una letra' }]}>
            <Select
              options={alumnos}
              placeholder="Seleccionar un grupo"
            />
          </Form.Item>
          <Form.Item label="Filtrado por grupo" name="group" rules={[{ required: true, message: 'Seleccione una letra' }]}>
            <Select
              options={alumnos}
              placeholder="Seleccionar un grupo"
            />
          </Form.Item>
          <Form.Item label="Filtrado por profesora" name="group" rules={[{ required: true, message: 'Seleccione una letra' }]}>
            <Select
              options={alumnos}
              placeholder="Seleccionar un grupo"
            />
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} dataSource={[]} rowKey="Dni" />
    </div>
  );
};

export default ListStudentsScreen;