import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { Card } from 'antd';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  elements
} from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);



// Bar chart for revenue (existing)
const barData = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 600 },
  { name: 'Mar', uv: 300 },
  { name: 'Apr', uv: 500 },
  { name: 'May', uv: 700 },
];

// Line chart for weekly activity (existing)
const lineData = [
  { name: 'Mon', value: 100 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 200 },
  { name: 'Thu', value: 350 },
  { name: 'Fri', value: 250 },
];

// Bar chart for buying patterns
const patternData = [
  { name: 'Jan', Electronics: 300, Fashion: 400 },
  { name: 'Feb', Electronics: 500, Fashion: 250 },
  { name: 'Mar', Electronics: 450, Fashion: 350 },
  { name: 'Apr', Electronics: 600, Fashion: 300 },
  { name: 'May', Electronics: 550, Fashion: 420 },
];

const HomeCharts = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
   

      <Card className='custom-card' title="Monthly Growth " style={{ flex: 1, borderRadius: 16 }}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className='custom-card' title="Weekly Growth" style={{ flex: 1, borderRadius: 16 }}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

   
      <Card className='custom-card' title="Buying Patterns by Category" style={{ flex: 1, borderRadius: 16 }}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={patternData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Electronics" fill="#1890ff" />
            <Bar dataKey="Fashion" fill="#faad14" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
    </div>
  );
};

export default HomeCharts;
