export const PAYMENT_COLUMNS = [
  { title: 'Grupo', dataIndex: 'group', key: 'group' },
  { title: 'Profesor/a', dataIndex: 'teacher', key: 'teacher' },
  { title: 'Alumnos', dataIndex: 'total_students', key: 'total_students' },
  { title: 'Monto Total', dataIndex: 'teacherEarnings', key: 'teacherEarnings', render: (_: any, record: any) => `$${record.teacherEarnings.toFixed(2)}` },
]