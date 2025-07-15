


import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Descriptions, Card, Row, Col, Tag, Typography, Breadcrumb } from 'antd';

const { Title } = Typography;

const PaymentsAndSettlementsdetails = () => {
  const { orderId } = useParams();
  const location = useLocation();

  // dummy order from location.state
  const order = location.state?.order;

  if (!order) return <p>Order not found.</p>;
const breadcrumbItems = [
  {
    title: <Link to="/payments">Payments</Link>,
  },
  {
    title: `Order Details - ${orderId}`,
  },
];

  return (
    <div>
    <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />

      <Card title="Payment Overview" bordered={false}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Order ID">{order.orderId}</Descriptions.Item>
          <Descriptions.Item label="Date">{order.date}</Descriptions.Item>
          <Descriptions.Item label="Amount">{order.amount}</Descriptions.Item>
          <Descriptions.Item label="Method">{order.method}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={order.status === 'Success' ? 'green' : 'orange'}>{order.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Products">
            {order.products.map((product, index) => (
              <Tag key={index}>{product}</Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </Card>


      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Shipping Info (Dummy)">
            <p><strong>Customer:</strong> John Doe</p>
            <p><strong>Address:</strong> 123, Green Street, New Delhi</p>
            <p><strong>Tracking ID:</strong> #TRK987654</p>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Commission Details (Dummy)">
            <p><strong>Commission:</strong> ₹200</p>
            <p><strong>Platform Fee:</strong> ₹25</p>
            <p><strong>Total Deducted:</strong> ₹225</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentsAndSettlementsdetails;
