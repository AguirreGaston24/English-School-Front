import React from "react";
import { Tag } from "antd"


export const PAY_COLUMNS = [
  {
    title: 'Mes de pago',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Pago',
    dataIndex: 'pay_month',
    key: 'pay_month',
    render: (pay_month: any, record: any) => (
      <Tag
        color={pay_month ? 'green' : 'red'}
      // onClick={() => handleUpdatePaymentStatus(record.studentId, record.month, record.year, !pay_month)}
      >
        {pay_month ? 'SI' : 'NO'}
      </Tag>
    ),
  },
  {
    title: 'Debe',
    dataIndex: 'debe',
    key: 'debe',
    render: (debe: any, record: any) => (
      <Tag
        color={debe ? 'green' : 'red'}
      // onClick={() => handleUpdatePaymentStatus(record.studentId, record.month, record.year, !pay_month)}
      >
        {debe ? 'SI' : 'NO'}
      </Tag>
    ),
  },
];