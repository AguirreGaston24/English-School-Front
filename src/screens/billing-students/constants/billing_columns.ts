import moment from "moment";

export const BILLING_COLUMNS = [
  {
    title: 'N° RECIBO',
    dataIndex: 'receipt_number',
    key: 'receipt_number',
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
    render: (_: any, record: any) => moment(record.createdAt).format('DD-MM-YYYY')
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

];