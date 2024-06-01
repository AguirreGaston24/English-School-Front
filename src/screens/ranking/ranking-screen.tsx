import { Table, TableProps } from "antd"

const RankingScreen = () => {

  const columnsDistrict : TableProps<any>['columns'] = [
    { title: 'Barrio', dataIndex: 'district', key: 'district' },
    { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
  ]

  const columnsSchool : TableProps<any>['columns'] = [
    { title: 'Escuela', dataIndex: 'district', key: 'district' },
    { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
  ]

  const columnsTeacher : TableProps<any>['columns'] = [
    { title: 'Profesora', dataIndex: 'district', key: 'district' },
    { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
  ]

  return (
    <div className='mx-auto px-4'>
      <h1 className='text-2xl font-bold mb-4'>Ranking de alumnos</h1>
      <div className='flex flex-wrap'>
        <div className='w-1/3 px-2'>
          <h2 className='text-xl font-semibold mb-2'>Por barrio</h2>
          <Table scroll={{ x: 800 }} className="mt-4" columns={columnsDistrict} rowKey="dni" />
        </div>
        <div className='w-1/3 px-2'>
          <h2 className='text-xl font-semibold mb-2'>Por escuela</h2>
          <Table scroll={{ x: 800 }} className="mt-4" columns={columnsSchool} rowKey="dni" />
        </div>
        <div className='w-1/3 px-2'>
          <h2 className='text-xl font-semibold mb-2'>Por profesoras</h2>
          <Table scroll={{ x: 800 }} className="mt-4" columns={columnsTeacher} rowKey="dni" />
        </div>
      </div>
    </div>
  )
}

export default RankingScreen