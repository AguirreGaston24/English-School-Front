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
} from 'chart.js';

import instance from '../api';
import { IStudent } from '../interfaces/student';
import { Bar, Doughnut } from 'react-chartjs-2';
import { CardStats } from '../components/card-stats';
import { SCHOOl } from "../constant/schools";

interface IEStudent extends Pick<IStudent, 'firstname' | 'lastname' | 'group' | 'birth_date'> { 
  daysUntilBirthday: number; 
}
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
    setLoading(true);
    instance.get('/stats')
      .then(({ data }) => {
        setData(data);
        const districts = data.districs; // Note: This might need to be 'districts' if it's a typo in the API
        const students_in_teacher = data.students_in_teacher;
        const labels = districts.map((district: any) => district._id);
        const counts = districts.map((district: any) => district.count);
        const studentGroups = students_in_teacher.map((item: any) => `${item.teacher} ${item.group}`);
        const counts1 = students_in_teacher.map((item: any) => item.count);
        const colors = counts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
        const sortedBirthdays = data.daysUntilBirthday.sort((a: IEStudent, b: IEStudent) => {
          return a.daysUntilBirthday - b.daysUntilBirthday;
        });

        setStudentsGroup({
          labels: studentGroups,
          datasets: [
            {
              label: 'Número de Alumnos por grupo',
              data: counts1,
              backgroundColor: colors,
            },
          ],
        });

        // Modificación aquí
        const schoolNames = SCHOOl.map(school => school.label); // Obtener los nombres de las escuelas

        setStudentsTableSchool({
          labels: schoolNames, // Usar los nombres de las escuelas como etiquetas
          datasets: [
            {
              label: 'Número de Alumnos por escuela',
              data: counts, // Asegúrate de que esto esté alineado con los nombres de las escuelas
              backgroundColor: colors,
            },
          ],
        });

        setStudentsTable({
          labels,
          datasets: [
            {
              label: 'Número de Alumnos',
              data: counts,
              backgroundColor: colors,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching stats:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true)
    instance.get('/stats')
      .then(({ data }) => {
        setData(data);

        const districts = data.districs;
        const labels = districts.map((district: any) => district._id);
        const counts = districts.map((district: any) => district.count);
        const colors = counts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`);
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
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <CardStats
          count={data.students}
          value = {data.students}
          icon={<PiStudentBold size={24} />}
          title='Alumnos Registrados'
          description='Todos los alumnos registrados'
          loading={loading}
          path='/students'
        />
        <CardStats
          count={data.teachers}
          value = {data.teachers}
          icon={<FaChalkboardTeacher size={24} />}
          title='Profesores Registrados'
          description='Todos los profesores registrados'
          loading={loading}
          path='/teachers'
        />
        <CardStats
          count={data.total_groups}
          value = {data.total_groups}
          icon={<MdGroups size={24} />}
          title='Grupos Registrados'
          description='Todos los grupos registrados'
          loading={loading}
          path='/groups'
        />
        <CardStats
          count={data.billing_students}
          value = {data.billing_students}
          icon={<BsCurrencyDollar size={24} />}
          title='Pagos Alumnos'
          description='Todos los pagos de los alumnos registrados'
          loading={loading}
          path='/billing-students'
        />
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        <Card title="Alumnos por Barrio" className='w-full'>
          <Bar options={options} data={studentsTable} />
        </Card>
  
        <Card title="Alumnos por Escuela" className='w-full'>
          <Bar
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Alumnos por Escuela', // Título del gráfico
                },
              },
            }}
            data={{
              labels: SCHOOl.map(school => school.label).slice(0, 15), // Nombres de las primeras 15 escuelas
              datasets: [
                {
                  label: 'Número de Alumnos',
                  data: studentsTableSchool.datasets && studentsTableSchool.datasets.length > 0
                    ? studentsTableSchool.datasets[0].data.slice(0, 15) // Datos de alumnos para las primeras 15 escuelas
                    : Array(15).fill(0, 0, 15), // Si no hay datos, llena con ceros
                  backgroundColor: studentsTableSchool.datasets && studentsTableSchool.datasets.length > 0
                    ? studentsTableSchool.datasets[0].backgroundColor.slice(0, 15) // Colores para las barras
                    : Array(15).fill('rgba(255, 99, 132, 0.5)') // Color predeterminado si no hay datos
                },
              ],
            }}
          />
        </Card>
      </div>
  
      <div className='mt-8'>
        <Card title="Alumnos por Grupo" className='w-full'>
          <Doughnut data={studentsGroup} options={studentsGroups} />
        </Card>
      </div>
  
      <div className='mt-8'>
  <Card
    title='Lista de cumpleaños'
    className='col-start-1 md:col-start-1 md:col-span-2 lg:col-start-4 lg:col-span-1'
  >
    <List
      className='overflow-y-scroll max-h-96 p-0'
      itemLayout="horizontal"
      dataSource={data.daysUntilBirthday.slice(0, 10)} // Mostrar solo los primeros 10 cumpleaños
      loading={loading}
      renderItem={(item: IEStudent, index) => {
        const daysUntilBirthday = Number(item.daysUntilBirthday);
        return (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index + 1}`} />}
              title={`${item.firstname} ${item.lastname}`}
              description={`${item.group} - ${getBirthdayMessage(daysUntilBirthday)}`} // Usar el valor convertido
            />
          </List.Item>
        );
      }}
    />
  </Card>
      </div>
    </div>
  );
  
  
  
}
