import { Button, Card, Descriptions, Form, Input, Table, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import TeacherSelect from '../../components/teacher-select';
import { getAllBillingTeachers, Pagination } from '../../api/billing-teachers';
import { ITeacher } from '../../interfaces/teacher';
import { toast } from 'sonner';
import { ColumnType } from 'antd/es/table';
import { FaArrowLeft } from 'react-icons/fa';
import { deletebillingTeachers } from '../../api/billing-teachers';
import jsPDF from 'jspdf';
import moment from 'moment';
import { GROUPS } from '../../constant/groups';
import { MONTHS } from '../../constant/months';

// Define la interfaz para los datos de billing
interface IBilling {
  _id: string;
  teacher_id: string;
  firstName: string;
  lastName: string;
  dni: string;
  groupName: string[]; // Nombres de los grupos
  receipt_number: number;
  month: string;
  amount: number;
  studentCount: number;
  createdAt: string;
  beca: string;
}

export const BillingTeachersScreen = () => {
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState<ITeacher | undefined>();
  const [billings, setBillings] = useState<IBilling[]>([]);
  const [filteredBillings, setFilteredBillings] = useState<IBilling[]>([]);
  const [groupFilter, setGroupFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState<string>(''); // Nuevo estado para el filtro de profesores

  const fetchData = (query: Pagination) => {
    setLoading(true);
    getAllBillingTeachers(query)
      .then(({ data }) => {
        if (data && data.response) {
          const transformedData = data.response.map((item: any) => ({
            _id: item._id,
            teacher_id: item.teacher_id,
            firstName: item.firstName,
            lastName: item.lastName,
            dni: item.dni,
            groupName: item.groupName,
            receipt_number: item.receipt_number,
            month: item.month,
            amount: item.amount,
            studentCount: item.studentCount,
            createdAt: item.createdAt,
            beca: item.beca,
          }));
          setBillings(transformedData);
        } else {
          console.warn("La respuesta de la API no contiene 'response'.", data);
          setBillings([]);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setBillings([]);
      })
      .finally(() => setLoading(false));
  };

  const generatePDF = (billing: IBilling) => {
    if (!billing) {
      toast.error('No se encontraron detalles de la facturación.');
      return;
    }

    const doc = new jsPDF();
    doc.setFillColor(240, 240, 240); // Fondo gris claro
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40); // Color de texto
    doc.text('Recibo de Pagos', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    doc.setDrawColor(150);
    doc.line(10, 30, doc.internal.pageSize.width - 10, 30); // Separador

    doc.setFontSize(16);
    doc.text(`Nombre: ${billing.firstName} ${billing.lastName}`, 10, 40);
    doc.text(`DNI: ${billing.dni}`, 10, 50);
    doc.text(``, 10, 60); // Espacio vacío

    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(`Detalles de Facturación:`, 10, 70);

    doc.setFontSize(14);
    doc.text(`Número de Recibo: ${billing.receipt_number}`, 10, 80);
    doc.text(`Mes: ${billing.month}`, 10, 90);
    doc.text(`Monto: $${billing.amount.toFixed(2)}`, 10, 100);
    doc.text(`Fecha de Pago: ${moment(billing.createdAt).format('DD-MM-YYYY')}`, 10, 110);
    doc.text(`Tipo de Beca: ${billing.beca}`, 10, 120);

    doc.setDrawColor(150);
    doc.line(10, 130, doc.internal.pageSize.width - 10, 130);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('¡Gracias por su pago!', doc.internal.pageSize.width / 2, 140, { align: 'center' });

    doc.save(`recibo_${billing.firstName}_${billing.month}.pdf`);
  };

  const PAYMENT_COLUMNS: ColumnType<IBilling>[] = [
    {
      title: 'Recibo N°',
      dataIndex: 'receipt_number',
      key: 'receipt_number',
    },
    {
      title: 'Nombre',
      key: 'fullName',
      render: (text, record) => `${record.firstName} ${record.lastName}`, // Concatenate first and last names
    },
    {
      title: 'Grupo',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (groupName: string[]) => groupName.join(', '),
    },
    {
      title: 'Alumnos',
      dataIndex: 'studentCount',
      key: 'studentCount',
    },
    {
      title: 'Mes',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Monto A Pagar',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'ACCIONES',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="default" onClick={() => generatePDF(record)}>
            Descargar PDF
          </Button>
        </>
      ),
    },
  ];

  const filterBillings = () => {
    let filtered = billings;

    if (groupFilter) {
      filtered = filtered.filter(billing => billing.groupName.includes(groupFilter));
    }

    if (teacherFilter) {
      filtered = filtered.filter(billing => {
        return `${billing.firstName} ${billing.lastName}`.toLowerCase().includes(teacherFilter.toLowerCase());
      });
    }
    
    if (monthFilter) {
      filtered = filtered.filter(billing => billing.month.toLowerCase().includes(monthFilter.toLowerCase()));
    }
    
    setFilteredBillings(filtered);
  };

  const handleGroupFilterChange = (value: string) => {
    setGroupFilter(value);
  };

  const handleMonthFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthFilter(e.target.value); // Cambia aquí para manejar la entrada del mes
  };

  const handleTeacherFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherFilter(e.target.value); // Actualiza el filtro de profesores
  };

  useEffect(() => {
    fetchData({ page: 1, limit: 20 });
  }, []);

  useEffect(() => {
    filterBillings(); // Filtra los recibos cada vez que cambie la lista de recibos o los filtros
  }, [billings, groupFilter, teacherFilter]);


  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">
          Historial sobre pagos de profesores
        </h2>
        
        <Card title="Seleccionar un Profesor" className="col-span-1 lg:col-span-4 p-5">
  <Form layout="vertical">
    <div className="flex flex-wrap justify-between gap-5">
      <Form.Item label="Filtro por Profesor" className="flex-1">
        <Input 
          placeholder="Escribe el nombre del profesor" 
          value={teacherFilter} 
          onChange={handleTeacherFilterChange}
        />
      </Form.Item>
      <Form.Item label="Filtro por grupo" className="flex-1">
        <Select 
          placeholder="Selecciona un grupo" 
          value={groupFilter} 
          onChange={handleGroupFilterChange}
          allowClear
        >
          {GROUPS.map(group => (
            <Select.Option key={group.value} value={group.value}>
              {group.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Filtro por Mes" className="flex-1">
        <Input 
          placeholder="Escribe el mes" 
          value={monthFilter} 
          onChange={handleMonthFilterChange}
        />
      </Form.Item>
    </div>
  </Form>
</Card>



        <Card title="Detalle de Pagos" className="col-span-1 lg:col-span-4">
          <Table
            className="col-span-1 md:col-span-1"
            scroll={{ x: 200 }}
            pagination={{ pageSize: 10 }}
            dataSource={filteredBillings}
            columns={PAYMENT_COLUMNS}
            rowKey="_id"
          />
        </Card>
      </div>
    </div>
  );
};