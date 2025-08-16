import React, { useState } from 'react';
import { Table, Tag, Button, Card, message } from 'antd';
import dayjs from 'dayjs';

// 🧾 Sample Reserve Data
const initialReservePayments = [
  {
    key: '1',
    orderId: 'ORD567',
    product: 'Mobile Charger',
    amount: '₹899',
    fee: '₹100',
    net: '₹799',
    date: '2025-04-01',
    holdUntil: '2025-07-01',
    status: 'Held',
  },
  {
    key: '2',
    orderId: 'ORD568',
    product: 'Laptop Stand',
    amount: '₹1,499',
    fee: '₹120',
    net: '₹1,379',
    date: '2025-03-20',
    holdUntil: '2025-06-20',
    status: 'Eligible',
  },
  {
    key: '3',
    orderId: 'ORD569',
    product: 'Mouse Pad',
    amount: '₹300',
    fee: '₹30',
    net: '₹270',
    date: '2025-03-15',
    holdUntil: '2025-06-15',
    status: 'Requested',
  },
];

const ReserveEarnings = () => {
  const [data, setData] = useState(initialReservePayments);

  const handleWithdrawalRequest = (record) => {
    const updated = data.map((item) =>
      item.key === record.key ? { ...item, status: 'Requested' } : item
    );
    setData(updated);
    message.success(`Withdrawal requested for Order ID ${record.orderId}`);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
    },
    {
      title: 'Net Earning',
      dataIndex: 'net',
    },
    {
      title: 'Hold Until',
      dataIndex: 'holdUntil',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'Held') color = 'orange';
        if (status === 'Eligible') color = 'green';
        if (status === 'Requested') color = 'purple';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      render: (_, record) => {
        return record.status === 'Eligible' ? (
          <Button type="primary" onClick={() => handleWithdrawalRequest(record)}>
            Request Withdrawal
          </Button>
        ) : (
          <span style={{ color: 'gray' }}>Not Available</span>
        );
      },
    },
  ];

  return (
    <Card title="💰 Reserve Earnings (90-Day Hold)">
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default ReserveEarnings;
