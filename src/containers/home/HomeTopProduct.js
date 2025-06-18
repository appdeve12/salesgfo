import React from 'react';
import { Row, Col, Card, Typography, Avatar } from 'antd';


import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
ChartJS.register(ArcElement, ChartTooltip, Legend);
const { Title, Text } = Typography;


const HomeTopProduct = () => {
  // Pie chart for demographics
const pieData = {
  labels: ['Male', 'Female', 'Others'],
  datasets: [
    {
      data: [55, 40, 5],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      borderWidth: 1,
    },
  ],
};
const products = [
  {
    id: 1,
    name: 'Fire Extinguisher',
    image: 'https://gfofireequipments.com/wp-content/uploads/2025/02/GFO-fire-and-safety.png',
    label: 'Top Selling Product',
  },
  {
    id: 2,
    name: 'Smoke Detector',
    image: 'https://gfofireequipments.com/wp-content/uploads/2025/02/GFO-fire-and-safety.png',
    label: 'Top Selling Product',
  },
  {
    id: 3,
    name: 'Fire Hose Reel',
    image: 'https://gfofireequipments.com/wp-content/uploads/2025/02/GFO-fire-and-safety.png',
    label: 'Top Selling Product',
  },
  {
    id: 4,
    name: 'Safety Sign Board',
    image: 'https://gfofireequipments.com/wp-content/uploads/2025/02/GFO-fire-and-safety.png',
    label: 'Top Selling Product',
  },
  {
    id: 5,
    name: 'Emergency Exit Light',
    image: 'https://gfofireequipments.com/wp-content/uploads/2025/02/GFO-fire-and-safety.png',
    label: 'Top Selling Product',
  },
];

const trendData = [
  { date: 'Jun 01', orders: 120 },
  { date: 'Jun 05', orders: 150 },
  { date: 'Jun 10', orders: 180 },
  { date: 'Jun 15', orders: 210 },
  { date: 'Jun 18', orders: 190 },
];
  return (
    <Row gutter={24} style={{marginBottom:"24px"}}>
      {/* Left 16-part content (you can add chart or overview here later) */}
      <Col span={16}>
        <Card style={{ borderRadius: 16, height: '100%' }}>
          {/* <Title level={4}>Overview (Add your content here)</Title> */}
          <Row gutter={24}>
            <Col span={12}>
           <Card className='custom-card' title="Customer Demographics" style={{ flex: 1, borderRadius: 16 }}>
                  <div style={{ width: '100%' ,height:"390px"}}>
                    <Pie data={pieData} />
                  </div>
                </Card>
            </Col>
                <Col span={12}>
       <Card
       className='custom-card'
      title="Order Trends"
      style={{
        borderRadius: 16,
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        height: '100%',
        maxHeight: 500,
        overflow: 'hidden',
      }}
      bodyStyle={{ padding: 24 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#1890ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Right 8-part content */}
      <Col span={8}>
        <Card
        className='custom-card'
          title="Best Selling Products"
          style={{
            borderRadius: 16,
            boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
            height: '100%',
            overflow: 'auto',
            maxHeight: 529,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              style={{
                marginBottom: 16,
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                padding: '12px 16px',
              }}
              bodyStyle={{ display: 'flex', alignItems: 'center', gap: 16,padding:10 }}
            >
              <Avatar src={product.image} size={48} />
              <div>
                <Text strong>{product.name}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {product.label}
                </Text>
              </div>
            </Card>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default HomeTopProduct;
