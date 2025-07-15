// pages/Signup.js
import React, { useState } from 'react';
import { Form, Input, Button, Steps, message, Upload, Typography, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

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
  };

  const uploadProps = {
    beforeUpload: () => false,
    multiple: false,
  };

  const steps = [
    {
      title: 'Basic Info',
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
               <Form.Item label="Alternate Email " name="alternateemail" rules={[{ required: true, type: 'email' }]}>
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
           
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle}>Next</Button>
          </Form.Item>
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
     
            <div style={{ marginTop: 10 }}>
          Already have an account ?  <Link to="/" style={linkStyle}>Sign In</Link>
            </div>
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
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Store Name" name="storeName" rules={[{  }]}>
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
              </Form.Item>
            </Col>
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
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
      
            <div style={{ marginTop: 10 }}>
  Already have an account ?  <Link to="/" style={linkStyle}>Sign In</Link>
            </div>
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
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
         
            <div style={{ marginTop: 10 }}>
    Already have an account ?  <Link to="/" style={linkStyle}>Sign In</Link>
  
            </div>
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
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
         
            <div style={{ marginTop: 10 }}>
   Already have an account ?  <Link to="/" style={linkStyle}>Sign In</Link>
            </div>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div style={pageWrapper}>
      {/* Left Illustration + Text */}
      <div style={leftSide}>
        <Title level={3}>
          <span style={{ color: '#f08804',  fontSize:"34px" }}>Sign Up</span> to Get The Best Deals,{' '}
          <span style={{ color: 'rgb(58, 71, 100)' ,  fontSize:"34px"}}>Exclusive</span> Offers with Fire Safety
        </Title>
        <img
          src="https://www.tradeindia.com/images/default/ti-signup.svg"
          alt="Illustration"
          style={{ width: '100%', maxWidth: 350, marginTop: 20 }}
        />
      </div>

      {/* Right Signup Form Card */}
      <div style={rightSide}>
        <Card style={cardStyle}>
          <Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>Create Your Seller Account</Title>
    <div style={{ display: 'flex', gap: 32 }}>
  {/* Left: Vertical Steps */}
  <div style={{ width: 220 }}>
    <Steps direction="vertical" current={current}>
      {steps.map((item) => (
        <Step key={item.title} title={item.title} />
      ))}
    </Steps>
  </div>

  {/* Right: Form Content */}
  <div style={{ flex: 1 }}>
    {steps[current].content}
  </div>
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
  fontSize:"34px"
};

const rightSide = {
  flex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const cardStyle = {
  width: 900, // or even 900
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
