export const PAYMENT_COLUMNS = [
  { title: 'Grupo', dataIndex: 'group', key: 'group' },
  { title: 'Alumnos', dataIndex: 'total_students', key: 'total_students' },
  { title: 'Monto Total', dataIndex: 'total_amount', key: 'total_amount', render: (_: any, record: any) => `$${record.total_amount?.toFixed(2)}` },
]