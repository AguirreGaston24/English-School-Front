import { Form, Table } from "antd"

export const BirthdayScreen = () => {

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Fecha',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Profesora',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hora Inicio Clase',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'Hora Cierre Clase',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Dias',
      dataIndex: 'days',
      key: 'days',
    },
    {
      title: 'Nivel',
      dataIndex: 'level',
      key: 'level',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    // Más datos...
  ];




  return (
    <div className='mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-4'>Cumpleaños de los alumnos</h1>
      <Table
        style={{
          backgroundImage: "url('/fondo-feliz-cumple.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius:8,
          height: '600px', // Ajusta esta altura según tus necesidades
          overflow: 'auto' // Asegura que el contenido sea desplazable
        }}
        scroll={{ x: 800 }}
        className="mt-4"
        rowKey="key"
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}
