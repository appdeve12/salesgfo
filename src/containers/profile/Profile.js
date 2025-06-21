import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Steps, Row, Col, Typography } from 'antd';

const { Step } = Steps;
const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const sellerData = {
    name: 'Anshika Singhal',
    email: 'anshika@example.com',
    phone: '9876543210',
    businessName: 'Anshika Enterprises',
    gstNumber: '29ABCDE1234F1Z5',
    address: 'Sector 62, Noida, UP',
  };

  useEffect(() => {
    form.setFieldsValue(sellerData);
    setFormData(sellerData);
  }, []);

  const next = (values) => {
    setFormData({ ...formData, ...values });
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const onFinish = async (values) => {
    const finalData = { ...formData, ...values };
    setLoading(true);
    try {
      console.log('Updated profile:', finalData);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Account Info',
      content: (
        <Form layout="vertical" onFinish={next} initialValues={formData} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Next</Button>
          </Form.Item>
        </Form>
      )
    },
    {
      title: 'Business Info',
      content: (
        <Form layout="vertical" onFinish={onFinish} initialValues={formData} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="GST Number" name="gstNumber" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Previous
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      )
    }
  ];

  return (
    <div style={wrapperStyle}>
      <Card style={cardStyle}>
        <Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>
          Update Your Profile
        </Title>

        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ width: 220 }}>
            <Steps direction="vertical" current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </div>
          <div style={{ flex: 1 }}>
            {steps[current].content}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Styles
const wrapperStyle = {

};

const cardStyle = {
 
};

export default Profile;
