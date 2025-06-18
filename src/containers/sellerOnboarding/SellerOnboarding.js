import React, { useState } from 'react';
import { Form, Input, Button, Steps, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Step } = Steps;

const SellerOnboarding = () => {
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
    message.success('Seller Registration Completed!');
    // Send `finalData` to backend API here
  };

  const uploadProps = {
    beforeUpload: () => false, // prevent auto upload
    multiple: false,
  };

  const steps = [
    {
      title: 'Account Info',
      content: (
        <Form layout="vertical" onFinish={next}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button className='' style={{backgroundColor:"rgb(58 71 100)"}} htmlType="submit">Next</Button>
        </Form>
      ),
    },
    {
      title: 'Business Details & GST',
      content: (
        <Form layout="vertical" onFinish={next}>
          <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="GST Number" name="gst" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Upload GST Certificate" name="gstCertificate">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Form.Item>
          <Button onClick={prev} style={{ marginRight: 8 }}>Previous</Button>
          <Button style={{backgroundColor:"rgb(58 71 100)"}}  htmlType="submit">Next</Button>
        </Form>
      ),
    },
    {
      title: 'KYC Details',
      content: (
        <Form layout="vertical" onFinish={next}>
          <Form.Item label="PAN Number" name="pan" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Upload PAN Card" name="panUpload">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload PAN</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Aadhar Number" name="aadhar" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Upload Aadhar Card" name="aadharUpload">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload Aadhar</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Upload Business License" name="licenseUpload">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload License</Button>
            </Upload>
          </Form.Item>
          <Button onClick={prev} style={{ marginRight: 8 }}>Previous</Button>
          <Button style={{backgroundColor:"rgb(58 71 100)"}}  htmlType="submit">Next</Button>
        </Form>
      ),
    },
    {
      title: 'Bank Details for Payouts',
      content: (
        <Form layout="vertical" onFinish={submit}>
          <Form.Item label="Account Holder Name" name="accountHolder" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Account Number" name="account" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="IFSC Code" name="ifsc" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Bank Name" name="bank" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button onClick={prev} style={{ marginRight: 8 }}>Previous</Button>
          <Button style={{backgroundColor:"rgb(58 71 100)"}}  htmlType="submit">Submit</Button>
        </Form>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 24 }}>
      <Steps current={current} style={{ marginBottom: 32 }}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {steps[current].content}
    </div>
  );
};

export default SellerOnboarding;
