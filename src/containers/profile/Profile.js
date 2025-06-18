import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mocked seller data (in real case, fetch from API)
  const sellerData = {
    name: 'Anshika Singhal',
    email: 'anshika@example.com',
    phone: '9876543210',
    businessName: 'Anshika Enterprises',
    gstNumber: '29ABCDE1234F1Z5',
    address: 'Sector 62, Noida, UP',
  };

  useEffect(() => {
    form.setFieldsValue(sellerData); // preload form with existing data
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Replace with API call
      console.log('Updated profile:', values);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Seller Profile" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={sellerData}
      >
        <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="GST Number" name="gstNumber" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Profile;
