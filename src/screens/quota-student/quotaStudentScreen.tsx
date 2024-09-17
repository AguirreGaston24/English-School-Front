import { Button, Input, Layout, Select, Table, TableProps } from "antd"
import { Content } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import Title from "antd/es/typography/Title";

export const QuotaStudentScreen = () => {

  const columnDetail: TableProps<any>['columns'] = [
    { title: 'Numero de Recibo', dataIndex: 'number', key: 'number' },
    { title: 'Pago', dataIndex: 'pay', key: 'pay' },
    { title: 'Fecha de Pago', dataIndex: 'date', key: 'date' },
    { title: 'Tipo de Beca', dataIndex: 'scholarship', key: 'scholarship' },
    { title: 'Valor de la cuota', dataIndex: 'worth', key: 'worth' },
    { title: 'Forma de pago', dataIndex: 'shape', key: 'shape' },
  ]

  const columnQuota: TableProps<any>['columns'] = [
    { title: 'Meses', dataIndex: 'month', key: 'month' },
    { title: 'Pago', dataIndex: 'pay', key: 'pay' },
    { title: 'Deuda', dataIndex: 'debt', key: 'debt' },
  ];


  const columnsStudent: TableProps<any>['columns'] = [
    { title: 'Grupo', dataIndex: 'group', key: 'group' },
    { title: 'Nivel', dataIndex: 'level', key: 'level' },
    { title: 'Profesora', dataIndex: 'level', key: 'level' },
    { title: 'Hora de Inicio', dataIndex: 'start', key: 'start' },
    { title: 'Hora de Fin', dataIndex: 'end', key: 'end' },
    { title: 'L', dataIndex: 'days', key: 'days' },
    { title: 'M', dataIndex: 'days', key: 'days' },
    { title: 'M', dataIndex: 'days', key: 'days' },
    { title: 'J', dataIndex: 'days', key: 'days' },
    { title: 'V', dataIndex: 'days', key: 'days' },
    { title: 'Fecha de Inicio', dataIndex: 'date', key: 'date' },
    { title: 'Fecha de Finalizacion', dataIndex: 'date', key: 'date' },
    { title: 'Cantidad de Cuotas Pagadas', dataIndex: 'quota', key: 'quota' },
  ]


  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos
    console.log('Formulario enviado');
  };

  return (
    <>

      <Layout className="bg-[#09090B] min-h-screen">
        <Content className="px-5 py-10">
          <div className="mb-10">
            <Title level={2} className="text-blue-500 font-bold text-center">Registrar Pagos de los Alumnos</Title>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <p className="w-full sm:w-1/12 text-gray-300 text-xl">Numero de Recibo:</p>
              <Input size="middle" className="w-full sm:flex-1" />
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <p className="w-full sm:w-40 text-gray-300">Mes a pagar:</p>
              <Select placeholder="Seleccionar mes a pagar" className="w-full sm:w-60">
                <Option value="enero">Enero</Option>
                <Option value="febrero">Febrero</Option>
                {/* Añadir más opciones aquí */}
              </Select>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <p className="w-full sm:w-40 text-gray-300">Tipo de beca:</p>
                <Input size="small" className="w-full sm:w-60" />
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <p className="w-full sm:w-40 text-gray-300">Forma de pago:</p>
                <Input size="small" className="w-full sm:w-60" />
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <p className="w-full sm:w-40 text-gray-300">Valor Couta:</p>
                  <Input size="small" className="w-full sm:w-60" />
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <p className="w-full sm:w-40 text-gray-300">Deuda:</p>
                  <Input size="small" className="w-full sm:w-60" />
                </div>
                <div>
                  <Button type="primary" htmlType="submit" className="mt-6 sm:mt-0">
                    Agregar Datos
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Content>
        <Content className="px-5 py-10">
          <div className="mb-10">
            <Title level={2} className="text-blue-500 font-bold text-center">Datos sobre los pagos de los alumnos</Title>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
              <Select placeholder="Seleccionar un alumno" className="w-full sm:w-60">
                <Option value="alumno1">Alumno 1</Option>
                <Option value="alumno2">Alumno 2</Option>
                {/* Añadir más opciones aquí */}
              </Select>
              <div className="flex flex-col sm:flex-row items-center sm:items-start w-full sm:w-auto">
                <p className="w-full sm:w-40 text-gray-300">Fecha ingreso:</p>
                <Input size="small" className="w-full sm:w-60" />
              </div>
            </div>
            <Table scroll={{ x: 800 }} className="mt-4" rowKey="dni" columns={columnsStudent} />
            <div className="flex flex-col lg:flex-row gap-6">
              <Table
                scroll={{ x: 600 }}
                className="mt-4"
                rowKey="dni"
                columns={columnQuota}
              />
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-300 mb-4">Detalle del recibo</p>
                <Table
                  scroll={{ x: 200 }}
                  className="mt-4"
                  rowKey="dni"
                  columns={columnDetail}
                />
              </div>
            </div>
          </div>
        </Content>
      </Layout>

    </>
  )
}
