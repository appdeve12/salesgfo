// pages/compliance/GSTReports.js
import { Card, Typography, Upload, Button, Table, Tag, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const GSTReports = () => {
  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Filing Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Filed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Uploaded On',
      dataIndex: 'uploaded',
      key: 'uploaded',
      render: (uploaded) => uploaded || '—',
    },
  ];

  const data = [
    {
      key: '1',
      month: 'May 2025',
      status: 'Filed',
      uploaded: 'June 10, 2025',
    },
    {
      key: '2',
      month: 'April 2025',
      status: 'Pending',
      uploaded: null,
    },
  ];

  const beforeUpload = (file) => {
    const isAllowed =
      file.type === 'application/pdf' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!isAllowed) {
      message.error('Only PDF or XLSX files are allowed!');
    }

    return false; // prevent auto upload
  };

  return (
    <Card>
      <Title level={4}>GST Report Upload</Title>

      <Upload beforeUpload={beforeUpload} showUploadList={false}>
        <Button className="custumcss textwhite" icon={<UploadOutlined />}>
          Upload GSTR-1 or GSTR-3B (PDF/XLSX)
        </Button>
      </Upload>

      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: 20 }}
        pagination={false}
      />
    </Card>
  );
};

export default GSTReports;
