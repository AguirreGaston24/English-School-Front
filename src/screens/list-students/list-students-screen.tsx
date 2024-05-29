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

    if (values.district) {
      filtered = filtered.filter(student => student.district === values.district);
    }
    if (values.school) {
      filtered = filtered.filter(student => student.school === values.school);
    }
    if (values.group) {
      filtered = filtered.filter(student => student.group === values.group);
    }
    if (values.teacher) {
      filtered = filtered.filter(student => student.teacher === values.teacher);
    }

    setFilteredStudents(filtered);
  };

  const districts = Array.from(new Set(students.map(student => student.district)))
    .map(district => ({ value: district, label: district }));
  const schools = Array.from(new Set(students.map(student => student.school)))
    .map(school => ({ value: school, label: school }));
  const groups = Array.from(new Set(students.map(student => student.group)))
    .map(group => ({ value: group, label: group }));
  const teachers = Array.from(new Set(students.map(student => student.teacher)))
    .map(teacher => ({ value: teacher, label: teacher }));

  const columns: TableProps<any>['columns'] = [
    { title: 'Alumno', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Dni', dataIndex: 'dni', key: 'dni' },
    { title: 'Direccion', dataIndex: 'address', key: 'address' },
    { title: 'Barrio', dataIndex: 'district', key: 'district' },
    { title: 'Escuela', dataIndex: 'school', key: 'school' },
    { title: 'Grupo', dataIndex: 'group', key: 'group' },
    { title: 'Grado', dataIndex: 'grade', key: 'grade' },
    { title: 'Profesora', dataIndex: 'teachers', key: 'teacher' },
  ];

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <Form form={form} layout="horizontal" onValuesChange={handleFilterChange}>
        <div className='flex justify-around'>
          <Form.Item label="Filtrado por barrio" name="district">
            <Select
              options={districts}
              placeholder="Seleccionar un barrio"
            />
          </Form.Item>
          <Form.Item label="Filtrado por escuela" name="school">
            <Select
              options={schools}
              placeholder="Seleccionar una escuela"
            />
          </Form.Item>
          <Form.Item label="Filtrado por grupo" name="group">
            <Select
              options={groups}
              placeholder="Seleccionar un grupo"
            />
          </Form.Item>
          <Form.Item label="Filtrado por profesora" name="teacher">
            <Select
              options={teachers}
              placeholder="Seleccionar una profesora"
            />
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} dataSource={filteredStudents} rowKey="dni" />
    </div>
  );
};

export default ListStudentsScreen;