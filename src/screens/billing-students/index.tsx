import { Button, Card, Form, Input, Select, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import StudentSelect from "../../components/student-select";
import { useGroupContext } from "../../context/group";
import { getStudent } from "../../api/students";
import { createbilling, getAllBilling, getBilling } from "../../api/billing";
import { MONTHS } from "../../constant/months";
import { BECAS } from "../../constant/becas";
import { PAY_COLUMNS } from "./constants/pay_columns";
import { BILLING_COLUMNS } from "./constants/billing_columns";
import { IStudent } from "../../interfaces/student";
import { BECAS_COLUMNS } from "./constants/becas_columns";
import { PAYMENTS } from "../../constant/payments";

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

  const handleGetUserGroup = (id: string) => {
    getStudent(id)
      .then(({ data }) => {
        const { phone, _id, group, firstname, email } = data.response as IStudent;
        if (!group) {
          toast.error('El estudiante no está asignado a ningún grupo.');
          setStudentInfo(null); 
        } else {
          setPhone(phone);
          setStudentId(_id);
          setStudentInfo(data.response);
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Si no hay estudiante seleccionado, obtener todos los recibos
      // Aquí asumo que tienes una función en tu API para obtener todos los recibos
      getAllBilling({}) // Ajusta esto según tu API
        .then(({ data }) => {
          setBillings(data);
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

    const { amount, month, payment_type, beca } = values;

    const billingData = {
      student_id: student_id,
      receipt_number: receiptNumber,
      month: month,
      beca: beca,
      amount: amount,
      phone: phone,
      payment_type: payment_type,
      description: "Descripción del pago",
    };

    console.log(billingData); // Verifica el contenido del objeto

    createbilling(billingData)
      .then(({ data }) => {
        toast.success('Facturación creada con éxito!');
        setReceiptNumber(prev => prev + 1);
        fetchBillings(student_id); // Actualiza el historial de pagos
      })
      .catch((error) => {
        console.error('Error al crear la facturación:', error);
        toast.error('Error al crear la facturación!');
      });
  };

  const amount = Form.useWatch('amount', form); // Monto de la cuota
  const feeType = Form.useWatch('beca', form); // Tipo de beca

  useEffect(() => {
    const calculateTotal = () => {
      const baseAmount = amount || 0; // Monto de la cuota
      const selectedBeca = BECAS.find(b => b.value === feeType); // Busca la beca seleccionada
      const discountAmount = selectedBeca ? selectedBeca.price : 0; // Obtiene el precio de la beca
      const total = baseAmount - discountAmount; // Calcula el total
      form.setFieldValue('debe_amount', total); // Actualiza el campo "Debe"
    };

    calculateTotal();
  }, [amount, feeType, form]);

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
              <Form.Item label="Forma de pago:" name="payment_type" required>
                <Select placeholder="Selecciona una forma de pago" options={PAYMENTS} />
              </Form.Item>
              <Form.Item label="Valor de la cuota:" name="amount" required>
                <Input type="number" placeholder="Ingresa el valor de la cuota" />
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
                deuda_month: billings.some((billing: any) => billing.month === month.value && !billing.pay_month),
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
    </div>
  );
};
