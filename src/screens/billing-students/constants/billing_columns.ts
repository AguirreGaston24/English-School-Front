import moment from "moment";

export const BILLING_COLUMNS = [
  {
    title: 'N° RECIBO',
    dataIndex: 'receiptNumber',
    key: 'receiptNumber',
  },
  // {
  //   title: 'PAGO',
  //   dataIndex: 'paid',
  //   key: 'paid',
  //   render: (paid: boolean) => (
  //     <Tag color={paid ? 'green' : 'red'}>
  //       {paid ? 'Paid' : 'Not Paid'}
  //     </Tag>
  //   ),
  // },
  {
    title: 'FECHA DE PAGO',
    dataIndex: 'paymentDate',
    key: 'paymentDate',
    render: (_: any, record: any) => moment(record.paymentDate).format('DD-MM-YYYY')
  },
  {
    title: 'TIPO DE BECA',
    dataIndex: 'scholarshipType',
    key: 'scholarshipType',
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

];