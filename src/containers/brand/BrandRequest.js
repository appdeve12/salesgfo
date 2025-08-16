import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Tag,
  message,
  Upload,
  Card,
  Row,
  Col,
  Typography
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { allbrands, brandrequest } from '../../services/allService';

const { Title } = Typography;

const BrandRequest = () => {
  const [form] = Form.useForm();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileUrls, setFileUrls] = useState({
  trademarkCertificate: '',
  authorizationLetter: '',
  purchaseInvoice: '',
});

const handleFileUpload = async (file, field) => {
  const formData = new FormData();
  formData.append('media', file);

  try {
    const res = await axios.post('http://localhost:5000/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    message.success(`${field} uploaded successfully`);

    // Set uploaded file URL
    setFileUrls((prev) => ({
      ...prev,
      [field]: res.data.filename, // Or res.data.fileUrl
    }));
  } catch (err) {
    message.error(`Upload failed for ${field}`);
  }

  return false; // Prevent default upload
};


  const fetchRequests = async () => {
    debugger
    try {
      const response=await allbrands()
      if(response.status==200){
        setRequests(response.data.allbrandperseller)
      }
   
    } catch (err) {
      message.error('Failed to fetch brand requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onFinish = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value);
      }
    });

    setLoading(true);
    try {
        const response= await brandrequest(formData)
 console.log(response)
 if(response.status==201){
        message.success('Brand request submitted');
      form.resetFields();
      fetchRequests();
 }
    
    } catch (err) {
      message.error(err?.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Brand Name',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'TM Ref #',
      dataIndex: 'tmReferenceNumber',
      key: 'tmReferenceNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Rejection Reason',
      dataIndex: 'rejectionReason',
      key: 'rejectionReason',
      render: (text) => text || '—',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={12}>
          <Card title="Request Brand Authorization" bordered>
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              size="small"
            >
              <Form.Item
                name="brandName"
                label="Brand Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Brand Name" />
              </Form.Item>
              <Form.Item
                name="tmReferenceNumber"
                label="TM Reference No."
                rules={[{ required: true }]}
              >
                <Input placeholder="TM Reference Number" />
              </Form.Item>

       <Form.Item label="Trademark Certificate" required>
  <Upload
    beforeUpload={(file) => handleFileUpload(file, 'trademarkCertificate')}
    showUploadList={false}
  >
    <Button icon={<UploadOutlined />} size="small">Upload Certificate</Button>
  </Upload>
  {fileUrls.trademarkCertificate && <span style={{ fontSize: 12 }}>{fileUrls.trademarkCertificate}</span>}
</Form.Item>

<Form.Item label="Authorization Letter" required>
  <Upload
    beforeUpload={(file) => handleFileUpload(file, 'authorizationLetter')}
    showUploadList={false}
  >
    <Button icon={<UploadOutlined />} size="small">Upload Letter</Button>
  </Upload>
  {fileUrls.authorizationLetter && <span style={{ fontSize: 12 }}>{fileUrls.authorizationLetter}</span>}
</Form.Item>

<Form.Item label="Purchase Invoice" required>
  <Upload
    beforeUpload={(file) => handleFileUpload(file, 'purchaseInvoice')}
    showUploadList={false}
  >
    <Button icon={<UploadOutlined />} size="small">Upload Invoice</Button>
  </Upload>
  {fileUrls.purchaseInvoice && <span style={{ fontSize: 12 }}>{fileUrls.purchaseInvoice}</span>}
</Form.Item>


              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="small"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Your Brand Requests" bordered>
            <Table
              columns={columns}
              dataSource={requests}
              rowKey="_id"
              size="small"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BrandRequest;
