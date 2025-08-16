// pages/Login.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/allService';
import { useDispatch } from 'react-redux';
import { storetoken, storeuserdata } from '../../redux/authSlice';
const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({ email: "", password: "" })
  console.log("formdata", formdata)
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value })
  }
  // const onFinish = () => {
  //   console.log('Login:', values);
  //   navigate('/home')
  // };
  const handleSubmit = async () => {
    try {
      const response = await loginUser(formdata);
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        dispatch(storetoken(response.data.token));
        dispatch(storeuserdata(response.data.user));
        message.success('Login successful!');
        setTimeout(() => {
          navigate('/home');
        }, 800);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div style={containerStyle}>
      <Card style={cardStyle} variant={false}>
        <Title level={2} style={titleStyle}>Welcome Back</Title>
        <Form layout="vertical">
          <Form.Item
            name="email"
            label={<span style={labelStyle}>Email or mobile phone number</span>}
            rules={[{ required: true, message: 'Please enter your email or phone number' }]}
          >
            <Input
              name="email"
              size="large"
              placeholder="Enter email or phone number"
              style={inputStyle}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item

            label={<span style={labelStyle}>Password</span>}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              size="large"
              name="password"
              placeholder="Enter your password"
              style={inputStyle}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={buttonStyle}
              onClick={() => handleSubmit()}
            >
              Sign In
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Link to="/forgot-password" style={linkStyle}>Forgot your password?</Link>
            <div style={{ marginTop: 10 }}>
              New to Fire Safety? <Link to="/signup" style={linkStyle}>Create your Fire Safety account</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// Styles
const containerStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // background: 'linear-gradient(to right,rgba(19, 13, 10, 0.86),rgb(218, 88, 88))', 
  fontFamily: `'Segoe UI', 'Roboto', sans-serif`,
};

const cardStyle = {
  width: 420,

  borderRadius: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: 35,
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  borderRadius: 8,
  height: '45px',
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: 'rgb(58 71 100)',
  borderColor: '#f08804',
  height: '45px',
  borderRadius: 10,
  fontSize: '16px',
  fontWeight: 'bold',
};

const labelStyle = {
  fontSize: '15px',
  fontWeight: 600,
};

const linkStyle = {
  color: '#007185',
  fontWeight: '500',
};

export default Login;
