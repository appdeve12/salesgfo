// pages/ForgotPassword.js
import React from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log('Forgot Password:', values);
    // Add API integration here
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Password Assistance</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Enter your email or mobile number"
            rules={[{ required: true, message: 'Please enter your email or phone number' }]}
          >
            <Input size="large" style={inputStyle} />
          </Form.Item>
          <Form.Item>
            <Button  htmlType="submit"  block style={buttonStyle}>Continue</Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            Remembered your password? <Link to="/" style={{ color: '#007185' }}>Sign-In</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// 🔥 Styling
const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // background: 'linear-gradient(to right, orange, red)',
  fontFamily: `'Segoe UI', 'Roboto', sans-serif`,
};

const cardStyle = {
  width: 420,

  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const inputStyle = {
  borderRadius: 8,
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: 'rgb(58 71 100)',
  color:"white",
  borderColor: '#f08804',
  borderRadius: 8,
  fontWeight: 'bold',
  fontSize: '16px',
  height: '45px',
};

export default ForgotPassword;
