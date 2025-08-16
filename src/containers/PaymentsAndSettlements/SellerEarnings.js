import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Card, message } from 'antd';
import dayjs from 'dayjs';

// Dummy data (with reserve and date logic)
const today = dayjs();

const orders = [
  {
    key: '1',
    orderId: 'ORD101',
    product: 'Phone Case',
    grossAmount: 1000,
    orderDate: '2025-04-15',
    status: 'Held',
  },
  {
    key: '2',
    orderId: 'ORD102',
    product: 'Wireless Earbuds',
    grossAmount: 1500,
    orderDate: '2025-03-01',
    status: 'Eligible',
  },
  {
    key: '3',
    orderId: 'ORD103',
    product: 'Laptop Sleeve',
    grossAmount: 800,
    orderDate: '2025-02-01',
    status: 'Requested',
  },
];

const SellerEarnings = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Compute reserve and status based on dates
    const updatedData = orders.map((order) => {
      const fee = +(order.grossAmount * 0.1).toFixed(2); // 10%
      const net = +(order.grossAmount - fee).toFixed(2);
      const holdUntil = dayjs(order.orderDate).add(90, 'day');
      const isEligible = today.isAfter(holdUntil);
      return {
        ...order,
        platformFee: `₹${fee}`,
        netPayable: `₹${net}`,
        holdUntil: holdUntil.format('YYYY-MM-DD'),
        status:
          order.status === 'Requested' || order.status === 'Paid'
            ? order.status
            : isEligible
            ? 'Eligible'
            : 'Held',
      };
    });
    setData(updatedData);
  }, []);

  const handleRequest = (record) => {
    const newData = data.map((item) =>
      item.key === record.key ? { ...item, status: 'Requested' } : item
    );
    setData(newData);
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
      title: 'Order Date',
      dataIndex: 'orderDate',
    },
    {
      title: 'Gross Amount',
      dataIndex: 'grossAmount',
      render: (val) => `₹${val}`,
    },
    {
      title: 'Platform Fee (10%)',
      dataIndex: 'platformFee',
    },
    {
      title: 'Net Payable',
      dataIndex: 'netPayable',
    },
    {
      title: 'Hold Until',
      dataIndex: 'holdUntil',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'orange';
        if (status === 'Eligible') color = 'green';
        if (status === 'Requested') color = 'blue';
        if (status === 'Paid') color = 'purple';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      render: (_, record) =>
        record.status === 'Eligible' ? (
          <Button type="primary" onClick={() => handleRequest(record)}>
            Request Withdrawal
          </Button>
        ) : (
          <span style={{ color: '#aaa' }}>Not Available</span>
        ),
    },
  ];

  return (
    <Card title="💼 Seller Earnings with 10% Reserve (90-Day Hold)">
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
    </Card>
  );
};

export default SellerEarnings;
