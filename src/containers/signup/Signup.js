// pages/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button, Steps, message, Upload, Typography, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { registerSeller } from '../../services/allService';

const { Step } = Steps;
const { Title } = Typography;

const Signup = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    businessName: '',
    storeName: '',
    businessAddress: '',
    gstNumber: '',
    gstCertificateUrl: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  });

  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prev) => ({ ...prev, ...values }));
      setCurrent(current + 1);
      form.resetFields();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    form.setFieldsValue(formData); // fill previous data
  };

  const handleUploadChange = (info) => {
    if (info.file) {
      setFormData((prev) => ({
        ...prev,
        gstCertificateUrl: info.file.name,
      }));
      message.success(`${info.file.name} uploaded (mock only)`);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = { ...formData, ...values };
      setLoading(true);
      const response = await registerSeller(finalData);
      message.success(response.data.msg || 'Seller registered successfully!');
    } catch (error) {
      message.error(error?.response?.data?.msg || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    multiple: false,
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={next} style={buttonStyle}>
              Next
            </Button>
          </Form.Item>
          <div style={{ marginTop: 10 }}>
            Already have an account? <Link to="/" style={linkStyle}>Sign In</Link>
          </div>
        </Form>
      ),
    },
    {
      title: 'Business Details & GST',
      content: (
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="businessName"
                label="Business Name"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="storeName"
                label="Store Name"
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="businessAddress"
            label="Business Address"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={2} style={inputStyle} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gstNumber"
                label="GST Number"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gstCertificateUrl"
                label="Upload GST Certificate"
              >
                <Upload {...uploadProps} onChange={handleUploadChange}>
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
                {formData.gstCertificateUrl && (
                  <div style={{ marginTop: 8 }}>
                    File: {formData.gstCertificateUrl}
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Previous
            </Button>
            <Button type="primary" onClick={next} style={buttonStyle}>
              Next
            </Button>
          </Form.Item>
          <div style={{ marginTop: 10 }}>
            Already have an account? <Link to="/" style={linkStyle}>Sign In</Link>
          </div>
        </Form>
      ),
    },
    {
      title: 'Bank Details for Payouts',
      content: (
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="accountName"
                label="Account Name"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ifscCode"
                label="IFSC Code"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bankName"
                label="Bank Name"
                rules={[{ required: true }]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Previous
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyle}
              loading={loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form.Item>
          <div style={{ marginTop: 10 }}>
            Already have an account? <Link to="/" style={linkStyle}>Sign In</Link>
          </div>
        </Form>
      ),
    },
  ];

  return (
    <div style={pageWrapper}>
      {/* Left Side */}
      <div style={leftSide}>
        <Title level={3}>
          <span style={{ color: '#f08804', fontSize: "34px" }}>Sign Up</span> to Get The Best Deals,{' '}
          <span style={{ color: 'rgb(58, 71, 100)', fontSize: "34px" }}>Exclusive</span> Offers with Fire Safety
        </Title>
        <img
          src="https://www.tradeindia.com/images/default/ti-signup.svg"
          alt="Illustration"
          style={{ width: '100%', maxWidth: 350, marginTop: 20 }}
        />
      </div>

      {/* Right Side */}
      <div style={rightSide}>
        <Card style={cardStyle}>
          <Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>Create Your Seller Account</Title>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ width: 220 }}>
              <Steps direction="vertical" current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>
            <div style={{ flex: 1 }}>{steps[current].content}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Styles
const pageWrapper = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: '#fff9f6',
  fontFamily: `'Segoe UI', 'Roboto', sans-serif'`,
};

const leftSide = {
  flex: 1,
  padding: '60px 40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: "34px"
};

const rightSide = {
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  width: 900,
  padding: 30,
  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
};

const inputStyle = {
  borderRadius: 8,
  fontSize: '16px',
};

const buttonStyle = {
  backgroundColor: "rgb(58 71 100)",
  borderColor: '#f08804',
  borderRadius: 8,
  fontWeight: 'bold',
  fontSize: '16px',
  height: '45px',
};

const linkStyle = {
  color: '#007185',
  fontWeight: '500',
};

export default Signup;
