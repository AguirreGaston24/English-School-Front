import React, { useState } from 'react';
import { Select, Form, Table, TableProps } from 'antd';
import { useDataContext } from '../../context/data';
import { IStudent } from '../../interfaces/student';

const ListStudentsScreen = () => {
  const { students } = useDataContext();
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>(students);
  const [form] = Form.useForm();

  const handleFilterChange = () => {
    const values = form.getFieldsValue();
    let filtered = students;

    if (values.district && values.district !== 'none') {
      filtered = students.filter(student => student.district === values.district);
    } else if (values.school && values.school !== 'none') {
      filtered = students.filter(student => student.school === values.school);
    } else if (values.group && values.group !== 'none') {
      filtered = students.filter(student => student.group === values.group);
    } else if (values.teacher && values.teacher !== 'none') {
      filtered = students.filter(student => student.teacher === values.teacher);
    }


    setFilteredStudents(filtered);
  };



  const school = [{ value: 'none', label: 'Ninguno' }, ...Array.from(new Set(students.map(student => student.school)))
    .map(school => ({ value: school, label: school }))];
  const group = [{ value: 'none', label: 'Ninguno' }, ...Array.from(new Set(students.map(student => student.group)))
    .map(group => ({ value: group, label: group }))];
  const teacher = [{ value: 'none', label: 'Ninguno' }, ...Array.from(new Set(students.map(student => student.teacher)))
    .map(teacher => ({ value: teacher, label: teacher }))];
  const district = [{ value: 'none', label: 'Ninguno' }, ...Array.from(new Set(students.map(student => student.district)))
    .map(district => ({ value: district, label: district }))];
 

  const columns: TableProps<any>['columns'] = [
    { title: 'Alumno', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Dni', dataIndex: 'dni', key: 'dni' },
    { title: 'Direccion', dataIndex: 'address', key: 'address' },
    { title: 'Barrio', dataIndex: 'district', key: 'district' },
    { title: 'Escuela', dataIndex: 'school', key: 'school' },
    { title: 'Grupo', dataIndex: 'group', key: 'group' },
    { title: 'Profesora', dataIndex: 'teacher', key: 'teacher' },
  ];

  return (
    <div className=' mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-4'>Total de Alumnos {students.length}</h1>
      <Form form={form} layout="horizontal" onValuesChange={handleFilterChange}>
        <div className='flex justify-around  flex-wrap gap-4' >
          <Form.Item className='w-full sm:w-auto' label="Filtrado por barrio" name="district">
            <Select
              className="w-full sm:w-64"
              options={district}
              placeholder="Seleccionar un barrio"
              defaultValue="none"
            />
          </Form.Item>
          <Form.Item className='w-full sm:w-auto' label="Filtrado por escuela" name="school">
            <Select
              className="w-full sm:w-64"
              options={school}
              placeholder="Seleccionar una escuela"
              defaultValue="none"
            />
          </Form.Item>
          <Form.Item className='w-full sm:w-auto' label="Filtrado por grupo" name="group">
            <Select
              className="w-full sm:w-64"
              options={group}
              placeholder="Seleccionar un grupo"
              defaultValue="none"
            />
          </Form.Item>
          <Form.Item className='w-full sm:w-auto' label="Filtrado por profesora" name="teacher">
            <Select
              className="w-full sm:w-64"
              options={teacher}
              placeholder="Seleccionar una profesora"
              defaultValue="none"
            />
          </Form.Item>
         
        
        
        </div>
      </Form>
      <div>
        <Table scroll={{ x: 800 }} className="mt-4" columns={columns} dataSource={filteredStudents} rowKey="dni" />
      </div>
    </div>
  );
};

export default ListStudentsScreen;