import React from 'react';
import { Tabs, Table, Card, Tag, Row, Col } from 'antd';

const { TabPane } = Tabs;

// 🧾 Payment history with product details
const paymentHistoryData = [
  {
    key: '1',
    date: '2025-06-18',
    orderId: 'ORD123',
    products: ['Wireless Headphones', 'Bluetooth Speaker'],
    amount: '₹4,200',
    method: 'Bank Transfer',
    status: 'Success',
  },
  {
    key: '2',
    date: '2025-06-17',
    orderId: 'ORD124',
    products: ['Running Shoes'],
    amount: '₹2,100',
    method: 'UPI',
    status: 'Pending',
  },
];

// 💰 Commission breakdown
const commissionData = [
  {
    key: '1',
    orderId: 'ORD123',
    product: 'Wireless Headphones',
    commission: '₹150',
    fee: '₹20',
    total: '₹170',
  },
  {
    key: '2',
    orderId: 'ORD124',
    product: 'Running Shoes',
    commission: '₹200',
    fee: '₹25',
    total: '₹225',
  },
];

// 📊 Payment history table columns
const paymentColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Product(s)',
    dataIndex: 'products',
    render: (products) => products.map((p, i) => <Tag key={i}>{p}</Tag>),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Method',
    dataIndex: 'method',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (
      <Tag color={status === 'Success' ? 'green' : 'orange'}>{status}</Tag>
    ),
  },
];

// 📊 Commission table columns
const commissionColumns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Commission',
    dataIndex: 'commission',
  },
  {
    title: 'Platform Fee',
    dataIndex: 'fee',
  },
  {
    title: 'Total Deductions',
    dataIndex: 'total',
  },
];

// ✅ Component
const PaymentsAndSettlements = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Payments & Settlements</h2>

      <Tabs defaultActiveKey="1" type="card">
        {/* Tab 1: Payment History */}
        <TabPane tab="Payment History & Status" key="1">
          <Card title="Payment History Table" bordered={false}>
            <Table
              dataSource={paymentHistoryData}
              columns={paymentColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>

        {/* Tab 2: Commission & Fees */}
        <TabPane tab="Commission & Fees" key="2">
          <Card title="Commission & Fees Breakdown" bordered={false}>
            <Table
              dataSource={commissionData}
              columns={commissionColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>

        {/* Tab 3: Payment Settlements */}
        <TabPane tab="Payment Settlements" key="3">
          <Row gutter={16}>
            <Col span={8}>
              <Card title="This Week's Settlement" bordered={false}>
                <p><strong>Amount:</strong> ₹12,500</p>
                <p><strong>Status:</strong> <Tag color="green">Processed</Tag></p>
                <p><strong>Date:</strong> 10–16 June</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Yesterday's Settlement" bordered={false}>
                <p><strong>Amount:</strong> ₹2,500</p>
                <p><strong>Status:</strong> <Tag color="orange">Pending</Tag></p>
                <p><strong>Date:</strong> 18 June</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Next Scheduled Settlement" bordered={false}>
                <p><strong>Date:</strong> 20 June 2025</p>
                <p><strong>Expected Amount:</strong> ₹6,000</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentsAndSettlements;
