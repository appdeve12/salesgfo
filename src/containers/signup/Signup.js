// pages/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button, Steps, message, Upload, Typography, Card ,Row,Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Title } = Typography;

const Signup = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});

  const next = (values) => {
    setFormData({ ...formData, ...values });
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const submit = (values) => {
    const finalData = { ...formData, ...values };
    console.log('Submitted:', finalData);
    message.success('Registration complete!');
    // Send finalData to backend here
  };

  const uploadProps = {
    beforeUpload: () => false,
    multiple: false,
  };

  const steps = [
    {
      title: 'Account Info',
      content: (
        <Form layout="vertical" onFinish={next}>
    <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
        <Input size="large" style={inputStyle} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input size="large" style={inputStyle} />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
        <Input size="large" style={inputStyle} />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password size="large" style={inputStyle} />
      </Form.Item>
    </Col>
  </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Business Details & GST',
      content: (
        <Form layout="vertical" onFinish={next}>
               <Row gutter={16}>
    <Col span={12}>
          <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item></Col>
          <Col span={12}>
          <Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
            </Row>
          <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
            <Input.TextArea rows={2} style={inputStyle} />
          </Form.Item>
               <Row gutter={16}>
    <Col span={12}>
          <Form.Item label="GST Number" name="gst" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item></Col>
              <Col span={12}>
          <Form.Item label="Upload GST Certificate" name="gstCertificate">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>
          </Col>
          </Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>Previous</Button>
            <Button type="primary" htmlType="submit" style={buttonStyle}>Next</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'KYC Details',
      content: (
        <Form layout="vertical" onFinish={next}>
                       <Row gutter={16}>
    <Col span={12}>
          <Form.Item label="PAN Number" name="pan" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>

         
            <Col span={12}>
          <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
          </Row>
      <Row gutter={16}>
  <Col span={8}>
    <Form.Item label="Upload PAN Card" name="panUpload">
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload PAN</Button>
      </Upload>
    </Form.Item>
  </Col>
  <Col span={8}>
    <Form.Item label="Upload Aadhar Card" name="aadharUpload">
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload Aadhar</Button>
      </Upload>
    </Form.Item>
  </Col>
  <Col span={8}>
    <Form.Item label="Upload Business License" name="licenseUpload">
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload License</Button>
      </Upload>
    </Form.Item>
  </Col>
</Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>Previous</Button>
            <Button type="primary" htmlType="submit" style={buttonStyle}>Next</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Bank Details for Payouts',
      content: (
        <Form layout="vertical" onFinish={submit}>
                          <Row gutter={16}>
    <Col span={12}>
          <Form.Item label="Account Holder Name" name="accountHolder" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
              <Col span={12}>
          <Form.Item label="Account Number" name="account" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
          </Row>
                         <Row gutter={16}>
    <Col span={12}>
          <Form.Item label="IFSC Code" name="ifsc" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
              <Col span={12}>
          <Form.Item label="Bank Name" name="bank" rules={[{ required: true }]}>
            <Input size="large" style={inputStyle} />
          </Form.Item>
          </Col>
          </Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>Previous</Button>
            <Button type="primary" htmlType="submit" style={buttonStyle}>Submit</Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Create Your Seller Account</Title>
        <Steps current={current} style={{ marginBottom: 32 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps[current].content}
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
  width: 900,

  borderRadius: 16,
  backgroundColor: 'rgba(255, 255, 255, 0.97)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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

export default Signup;
