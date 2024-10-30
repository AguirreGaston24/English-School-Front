import { Button, Card, Form, Input, Modal, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import moment from "moment";
import StudentSelect from "../../components/student-select";
import { useGroupContext } from "../../context/group";
import { getStudent } from "../../api/students";
import { createbilling, deleteBilling, getAllBilling, getBilling } from "../../api/billing";
import { MONTHS } from "../../constant/months";
import { BECAS } from "../../constant/becas";
import { PAY_COLUMNS } from "./constants/pay_columns";
import { BILLING } from "./constants/billing_columns";
import { IStudent } from "../../interfaces/student";
import { BECAS_COLUMNS } from "./constants/becas_columns";
import { PAYMENTS } from "../../constant/payments";
import { jsPDF } from "jspdf";
import { FaArrowLeft } from "react-icons/fa6";


export const BillingStudentScreen = () => {
  const { groups, loading, handleFilterChange } = useGroupContext();
  const [billings, setBillings] = useState<any>([]);
  const [student_id, setStudentId] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<IStudent | null>(null);
  const [teacher_id, setTeacherId] = useState('');
  const [discount, setDiscount] = useState(0.00);
  const [phone, setPhone] = useState('');
  const [form] = useForm();
  const [receiptNumber, setReceiptNumber] = useState(1); // Inicializa el contador en 1
  const { confirm } = Modal; // Extract confirm from Modal

  const handleGetUserGroup = (id: string) => {
    getStudent(id)
      .then(({ data }) => {
        const { phone, _id, group, firstname, email } = data.response as IStudent;
        if (!group) {
          toast.error('El estudiante no está asignado a ningún grupo.');
          setStudentInfo(null); // Asegúrate de que `studentInfo` sea null si no hay grupo
        } else {
          setPhone(phone);
          setStudentId(_id);
          setStudentInfo(data.response); // Establece `studentInfo` correctamente
          handleFilterChange([['group', group]]);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error al obtener la información del estudiante.');
      });
  };
  

  // Función para obtener los recibos, dependiendo si hay un estudiante seleccionado o no
  const fetchBillings = (studentId: string | null) => {
    if (studentId) {
      getBilling(studentId)
        .then(({ data }) => {
          setBillings(data);
          // Actualizar el número de recibo basado en el último recibo
          const lastReceiptNumber = data.length > 0 ? Math.max(...data.map((billing: any) => billing.receipt_number)) : 0;
          setReceiptNumber(lastReceiptNumber + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getAllBilling({}) 
        .then(({ data }) => {
          setBillings(data);
          // Actualizar el número de recibo basado en el último recibo
          const lastReceiptNumber = data.length > 0 ? Math.max(...data.map((billing: any) => billing.receipt_number)) : 0;
          setReceiptNumber(lastReceiptNumber + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  useEffect(() => {
    fetchBillings(student_id);
  }, [student_id]);

  

  const onSubmitBilling = (values: any) => {
    // Verificar si se ha seleccionado un estudiante
    if (!student_id) {
      toast.error('Selecciona un estudiante.');
      return; // Termina la función si no hay estudiante
    }

    const { amount, month, payment_type, beca, debe_amount, amount_to_pay  } = values;

    const billingData = {
      student_id: student_id,
      month: month,
      beca: beca,
      amount: amount,
      phone: phone,
      payment_type: payment_type,
      description: "Descripción del pago",
      debe_amount: debe_amount,
      amount_to_pay: amount_to_pay,
      group_id: studentInfo?.group
    };

    console.log(billingData); // Verifica el contenido del objeto

    createbilling(billingData)
    .then(({ data }) => {
      toast.success('Facturación creada con éxito!');
      setReceiptNumber(prev => prev + 1); // Incrementar el número de recibo
      fetchBillings(student_id); // Actualizar el historial de pagos
    })
    .catch((error) => {
      console.error('Error al crear la facturación:', error);
      toast.error('Error al crear la facturación!');
    });
  };

  const amount_to_pay = Form.useWatch('amount_to_pay', form); // Define amount_to_pay here
  const feeType = Form.useWatch('beca', form); // Tipo de beca

  useEffect(() => {
    const calculateTotal = () => {
      const becaAmount = BECAS.find(b => b.value === feeType)?.price || 0; // Obtiene el valor de la beca
      const userAmountToPay = amount_to_pay || 0; // Valor ingresado por el usuario
      const resta = becaAmount - userAmountToPay; // Calcula la diferencia
      const total = resta < 0 ? 0 : resta; // Usa un operador ternario para asignar el valor
      form.setFieldValue('amount', becaAmount); // Asigna el valor de la beca a "amount"
      form.setFieldValue('debe_amount', total); // Asigna el resultado a "debe_amount"
    };
  
    calculateTotal();
  }, [amount_to_pay, feeType, form]);
  

  const generatePDF = (student: IStudent, billing: any) => {
    console.log("Generating PDF for:", student, billing); // Verifica los datos recibidos
    if (!billing) {
      toast.error('No se encontraron detalles de la facturación.');
      return;
    }
  
    const doc = new jsPDF();
  
    // Establecer un fondo de color
    doc.setFillColor(240, 240, 240); // Color de fondo (gris claro)
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
    // Título
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40); // Color de texto
    doc.text('Recibo de Pagos', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
    // Separador
    doc.setDrawColor(150);
    doc.line(10, 30, doc.internal.pageSize.width - 10, 30); // Línea horizontal
  
    // Información del estudiante
    doc.setFontSize(16);
    doc.text(`Nombre: ${student.firstname} ${student.lastname}`, 10, 40);
    doc.text(`Email: ${student.email}`, 10, 50);
    doc.text(`Teléfono: ${student.phone}`, 10, 60);
    
    // Espaciado
    doc.text(``, 10, 70); // Espacio vacío
    
    // Información de la facturación
    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60); // Color de texto para la sección de facturación
    doc.text(`Detalles de Facturación:`, 10, 80);
  
    // Información de la factura
    doc.setFontSize(14);
    doc.text(`Número de Recibo: ${billing.receipt_number}`, 10, 90);
    doc.text(`Mes: ${billing.month}`, 10, 100);
    doc.text(`Monto: $${billing.amount.toFixed(2)}`, 10, 110);
    doc.text(`Fecha de Pago: ${moment(billing.createdAt).format('DD-MM-YYYY')}`, 10, 120);
    doc.text(`Tipo de Beca: ${billing.beca}`, 10, 130);
  
    // Separador
    doc.setDrawColor(150);
    doc.line(10, 140, doc.internal.pageSize.width - 10, 140); // Línea horizontal
  
    // Mensaje de agradecimiento
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80); // Color de texto
    doc.text('¡Gracias por su pago!', doc.internal.pageSize.width / 2, 150, { align: 'center' });
  
    // Guardar el PDF
    doc.save(`recibo_${student.firstname}_${billing.month}.pdf`);
  };

  const showDeleteConfirm = (billingId: string) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este recibo?',
      icon: <FaArrowLeft />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteBilling(billingId)
          .then(() => {
            toast.success("Recibo eliminado exitosamente");
            fetchBillings(student_id); // Recargar la lista de recibos
          })
          .catch((error) => {
            console.error("Error al eliminar el recibo:", error);
            toast.error("Error al eliminar el recibo");
          });
      },
      onCancel() {
        console.log('Cancelado');
      },
    });
  };
  
  
  // Definir las columnas de la tabla
  const BILLING_COLUMNS = [
    {
      title: 'N° RECIBO',
      dataIndex: 'receipt_number',
      key: 'receipt_number',
    },
    {
      title: 'FECHA DE PAGO',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => moment(text).format('DD-MM-YYYY'),
    },
    {
      title: 'TIPO DE BECA',
      dataIndex: 'beca',
      key: 'beca',
    },
    {
      title: 'MES DE PAGO',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'VALOR',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'DEBE',
      dataIndex: 'debe_amount',
      key: 'debe_amount',
    },
    {
      title: 'ACCIONES',
      key: 'actions',
      render: (text: any, record: any) => (
        <>
          <Button 
            type="default" 
            onClick={() => {
              if (record.studentInfo) {
                generatePDF(record.studentInfo, record);
              } else {
                toast.error("Información del estudiante no disponible.");
              }
            }}
          >
            Descargar PDF
          </Button>
          <Button
            type="primary"
            onClick={() => showDeleteConfirm(record._id)}
            style={{ marginLeft: 8 }}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <h2 className="text-lg font-bold col-span-1 lg:col-span-4 text-center md:text-start">
          Historial sobre pagos de alumnos
        </h2>
        <Card title="Seleccionar un alumno" className="col-span-1 lg:col-span-4 p-5">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={onSubmitBilling}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Form.Item label="Lista de Alumnos">
              <StudentSelect 
  allowClear
  className="w-full" 
  onChange={(_: any, option: { key: string | null }) => {
    const key = option?.key ?? null; // Cambia a null si no hay key
    setStudentId(key); // Actualiza student_id
    if (key) {
      handleGetUserGroup(key);
    } else {
      // Si no hay un estudiante seleccionado, actualiza el historial de recibos
      fetchBillings(null); // Obtiene todos los recibos
    }
  }} 
/>

              </Form.Item>
              <Form.Item label="N° de telefono:">
                <Input 
                  placeholder="N° de telefono" 
                  value={phone} 
                  onChange={({ target }) => setPhone(target.value)} 
                />
              </Form.Item>

              <Form.Item label="Mes a pagar:" name="month" required>
                <Select placeholder="Seleccionar un mes" options={MONTHS} />
              </Form.Item>
              <Form.Item label="Tipo de beca:" name="beca" required>
                <Select placeholder="Selecciona una beca" options={BECAS} />
              </Form.Item>
              <Form.Item label="Forma de pago:" name="payment_type"  required>
                <Select placeholder="Selecciona una forma de pago" options={PAYMENTS} />
              </Form.Item>
              <Form.Item label="Valor de la cuota:" name="amount" required>
                <Input type="number" placeholder="Ingresa el valor de la cuota" />
              </Form.Item>
              <Form.Item label="Monto A Pagar:" name="amount_to_pay">
                <Input type="number" placeholder="$00.0" />
              </Form.Item>
              <Form.Item label="Debe:" name="debe_amount">
                <Input type="number" placeholder="$00.0" readOnly />
              </Form.Item>
            </div>

            <div className="flex items-center justify-center mt-5">
              <Button type="primary" htmlType="submit" className="w-full md:w-auto">
                Enviar Recibo
              </Button>
            </div>
          </Form>
        </Card>

        <Card title="Información del alumno seleccionado" className="col-span-1 lg:col-span-4">
          <div className="flex justify-between">
            <div className="flex-1">
              <strong>Nombre: </strong> <span>{studentInfo?.firstname}</span>
            </div>
            <div className="flex-1 text-center">
              <strong>Email: </strong> <span>{studentInfo?.email}</span>
            </div>
            <div className="flex-1 text-center">
              <strong>Teléfono: </strong> <span>{phone}</span>
            </div>
            <div className="flex-1 text-center">
              <strong>Grupo: </strong> <span>{studentInfo?.group}</span>
            </div>
          </div>
        </Card>
        <Card title='Detalle del recibo' className="col-span-1 lg:col-span-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <Table
              className="col-span-1 md:col-span-1"
              scroll={{ x: 200 }}
              pagination={{
                pageSize: 20
              }}
              dataSource={MONTHS.map((month: any) => ({
                month: month.label,
                pay_month: billings.some((billing: any) => billing.month === month.value && billing.pay_month),
                debe: billings.some((billing: any) => billing.month === month.value && billing.debe),
                key: month.value
              }))}
              columns={PAY_COLUMNS}
              rowKey="key"
            />
            <Table
              className="col-span-1 md:col-span-3"
              scroll={{ x: 200 }}
              pagination={{
                pageSize: 10
              }}
              dataSource={billings}
              columns={BILLING_COLUMNS}
              rowKey="_id"
            />

 
          </div>
        </Card>
      </div>    
      <div className="table-container"> {/* Añadido el contenedor para la tabla */}
      <Table
        className="table" // Añadido el estilo para la tabla
        columns={BECAS_COLUMNS} // Usa las columnas definidas
        dataSource={BECAS} // Usa el array BECAS como la fuente de datos
        rowKey="id" // Asegúrate de que esta clave sea única para cada fila
        pagination={{
          pageSize: 10,
        }}
        scroll={{ x: 'max-content' }} // Permite que la tabla se desplace horizontalmente si es necesario
      />   
      </div>
    </div>
  );
};
