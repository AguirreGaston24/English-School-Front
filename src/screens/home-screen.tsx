import { Avatar, Card, List } from 'antd'
import { useEffect, useState } from 'react';
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';

import instance from '../api';
import { IStudent } from '../interfaces/student';
import { Bar, Doughnut } from 'react-chartjs-2';
import { CardStats } from '../components/card-stats';

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
    billing_students: 0,
  })



  const [studentsTableSchool, setStudentsTableSchool] = useState<any>({
    labels: [],
    datasets: [],
  });


  const [studentsTable, setStudentsTable] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [studentsGroup, setStudentsGroup] = useState<any>({
    labels: [],
    datasets: [],
  })



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

  const studentsSchool = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Alumnos por Escuela',
      },
    },
  };

  const studentsGroups = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Alumnos por grupos"
      }
    }
  }


  useEffect(() => {
    setLoading(true)
    instance.get('/stats')
      .then(({ data }) => {
        setData(data);
        console.log(data)
        const districts = data.districs;
        const students_in_teacher = data.students_in_teacher;
        const labels = districts.map((district: any) => district._id);
        const counts = districts.map((district: any) => district.count);
        const studentGroups = students_in_teacher.map((item: any) => `${item.teacher} ${item.group}`);
        const counts1 = students_in_teacher.map((item: any) => item.count);
        const colors = counts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);

        setStudentsGroup({
          labels,
          datasets: [
            {
              label: 'Número de Alumnos por grupo',
              data: counts,
              backgroundColor: colors,
            },
          ],
        })

        setStudentsTableSchool({
          labels,
          datasets: [
            {
              label: 'Número de Alumnos por escuela',
              data: counts,
              backgroundColor: colors,
            },
          ],
        })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => setLoading(false));
  }, [])


  useEffect(() => {
    setLoading(true)
    instance.get('/stats')
      .then(({ data }) => {
        setData(data);
        console.log(data)
        const districts = data.districs;
        const students_in_teacher = data.students_in_teacher;
        const labels = districts.map((district: any) => district._id);
        const counts = districts.map((district: any) => district.count);
        const labels1 = students_in_teacher.map((item: any) => `${item.teacher} ${item.group}`);
        const counts1 = students_in_teacher.map((item: any) => item.count);
        const colors = counts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
        // setTeacherPie({
        //   labels: labels1,
        //   datasets: [{
        //     label: 'Total de alumnos en su grupo',
        //     data: counts1,
        //     backgroundColor: colors,
        //     hoverOffset: 4
        //   }]
        // });
        setStudentsTable({
          labels,
          datasets: [
            {
              label: 'Número de Alumnos',
              data: counts,
              backgroundColor: colors,
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
      <h1 className='text-2xl font-bold'>Informacion general</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStats
          count={data.students}
          icon={<PiStudentBold size={24} />}
          title='Alumnos Registrados'
          description='Todos los alumnos registrados'
          loading={loading}
          path='/students'
        />
        <CardStats
          count={data.teachers}
          icon={<FaChalkboardTeacher size={24} />}
          title='Profesores Registrados'
          description='Todos los profesores registrados'
          loading={loading}
          path='/teachers'
        />
        <CardStats
          count={data.total_groups}
          icon={<MdGroups size={24} />}
          title='Grupos Registrados'
          description='Todos los grupos registrados'
          loading={loading}
          path='/groups'
        />
        <CardStats
          count={data.billing_students}
          icon={<BsCurrencyDollar size={24} />}
          title='Pagos Alumnos'
          description='Todos los pagos de los alumnos registrados'
          loading={loading}
          path='/billing-students'
        />

        <Card
          title='Alumnos por barrio'
          className='col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-3'
        >
          <Bar options={options} data={studentsTable} />
        </Card>
        <Card
          title='Lista de cumpleaños'
          className='col-start-1 md:col-start-1 md:col-span-2 lg:col-start-4 lg:col-span-1'
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
        <Card
          title="Alumnos por grupos"
          className='col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-3'
        >
          <Doughnut options={studentsGroups} data={studentsGroup} />
        </Card>

        <Card
          title='Alumnos por escuela'
          className='col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-3'
        >
          <Bar options={studentsSchool} data={studentsTableSchool} />
        </Card>

      </div>
    </div >
  )
}
