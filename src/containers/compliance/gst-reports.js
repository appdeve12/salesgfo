// pages/compliance/GSTReports.js
import { Card, Typography, Upload, Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const GSTReports = () => {
  const columns = [
    { title: 'Month', dataIndex: 'month' },
    { title: 'Filing Status', dataIndex: 'status' },
    { title: 'Uploaded On', dataIndex: 'uploaded' },
  ];

  const data = [
    { key: 1, month: 'May 2025', status: 'Filed', uploaded: 'June 10, 2025' },
    { key: 2, month: 'April 2025', status: 'Pending', uploaded: '—' },
  ];

  return (
    <Card>
      <Title level={4}>GST Report Upload</Title>
      <Upload beforeUpload={() => false}>
        <Button icon={<UploadOutlined />}>Upload GSTR-1 or GSTR-3B (PDF/XLSX)</Button>
      </Upload>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />
    </Card>
  );
};

export default GSTReports;
