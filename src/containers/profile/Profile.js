import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Steps,
  Row,
  Col,
  Typography,
  Modal,
} from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { updatesellerprofile } from '../../services/allService';


const { Step } = Steps;
const { Title } = Typography;

const Profile = () => {
  const userdata = useSelector((state) => state.auth.userdata);

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    alternateemail: '',
    businessName: '',
    gstNumber: '',
    businessAddress: '',
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
  });

  useEffect(() => {
    if (userdata) {
      setFormData((prev) => ({
        ...prev,
        ...userdata,
      }));
    }
  }, [userdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updatesellerprofile(formData)


      message.success(
        response.data.msg || 'Changes submitted successfully!'
      );
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.msg || 'Submission failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };


  const steps = [
    {
      title: 'Account Info',
      content: (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Email" required>
                <Input
                  name="email"
                  value={formData.email}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phone Number" required>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Alternate Email">
                <Input
                  name="alternateemail"
                  value={formData.alternateemail}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={next}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Business Info',
      content: (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Business Name" required>
                <Input
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="GST Number" required>
                <Input
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Business Address" required>
            <Input.TextArea
              rows={2}
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Previous
            </Button>
            <Button type="primary" onClick={next}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Bank Details',
      content: (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Account Name" required>
                <Input
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Account Number" required>
                <Input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="IFSC Code" required>
                <Input
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Name" required>
                <Input
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button onClick={prev} style={{ marginRight: 10 }}>
              Previous
            </Button>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              loading={loading}
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ border: '0px' }}>
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
          <div style={{ flex: 1 }}>{steps[current].content}</div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
