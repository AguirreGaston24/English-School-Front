import { Avatar, Card, List, Spin, Table } from 'antd'
import { useEffect, useState } from 'react';
import { PiStudentBold } from "react-icons/pi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import instance from '../api';
import { IUser } from '../interfaces/user';
import { IStudent } from '../interfaces/student';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

interface IEStudent extends Pick<IStudent, 'firstname' | 'lastname' | 'group'> { daysUntilBirthday: number }

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    districs: [],
    groups: [],
    daysUntilBirthday: [],
    students: 0,
    teachers: 0,
    total_groups: 0,
  })

  const [data_table, setDataTable] = useState<any>({
    labels: [],
    datasets: [],
  });


  const getBirthdayMessage = (daysUntilBirthday: number) => {
    if (daysUntilBirthday === 0) {
      return '¡Hoy es su cumpleaños!';
    } else if (daysUntilBirthday === 1) {
      return 'Mañana es su cumpleaños';
    } else {
      return `Faltan ${daysUntilBirthday} días para su cumpleaños`;
    }
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Alumnos por Barrio',
      },
    },
  };

  useEffect(() => {
    setLoading(true)
    instance.get('/stats')
      .then(({ data }) => {
        setData(data);
        const districts = data.districs
        const labels = districts.map((district: any) => district._id);
        const counts = districts.map((district: any) => district.count);
        setDataTable({
          labels,
          datasets: [
            {
              label: 'Número de Alumnos',
              data: counts,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, [])

  return (
    <div className='space-y-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">{loading ? <Spin /> : data.students}</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card>
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Profesores
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">{loading ? <Spin /> : data.teachers}</div>
            <p className="text-xs text-muted-foreground">
              Todos los profesores registrados
            </p>
          </div>
        </Card>
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Grupos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">{loading ? <Spin /> : data.total_groups}</div>
            <p className="text-xs text-muted-foreground">
              Todos los grupos registrados
            </p>
          </div>
        </Card>
        <Card className="shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-xl font-medium">
              Alumnos
            </div>
            <PiStudentBold size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold">{loading ? <Spin /> : 0}</div>
            <p className="text-xs text-muted-foreground">
              Todos los alumnos registrados
            </p>
          </div>
        </Card>
        <Card
          title='Alumnos por barrio'
          className='col-start-1 md:col-span-2  lg:col-start-1 lg:col-span-3'
        >
          <Bar options={options} data={data_table} />
        </Card>
        <Card
          title='Lista de cumpleaños'
          className='col-start-1 md:col-span-2 lg:col-start-4'
        >
          <List
            className='overflow-y-scroll max-h-96 p-0'
            itemLayout="horizontal"
            dataSource={data.daysUntilBirthday}
            loading={loading}
            renderItem={(item: IEStudent, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index + 1}`} />}
                  title={`${item.firstname} ${item.lastname}`}
                  description={`${item.group} - ${getBirthdayMessage(item.daysUntilBirthday)}`}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card className='col-span-4 md:col-span-2'>
          <Table columns={[]} dataSource={[]} />
        </Card>
        <Card className='col-span-4 md:col-span-2'>
          <Pie data={{
            labels: [
              'Red',
              'Blue',
              'Yellow'
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [300, 50, 100],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          }}
          />
        </Card>
      </div>
    </div >
  )
}
