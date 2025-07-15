import React from 'react';
import { Table, Card, Tag, Button, Input, Space, message, Popconfirm } from 'antd';
import { SendOutlined, WarningOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// 🔍 Sample review data
const reviewsData = [
  {
    key: '1',
    orderId: 'ORD123',
    product: 'Wireless Headphones',
    rating: 4,
    comment: 'Great sound quality!',
    customer: 'John Doe',
    status: 'published',
  },
  {
    key: '2',
    orderId: 'ORD124',
    product: 'Running Shoes',
    rating: 1,
    comment: 'Poor quality and delayed delivery',
    customer: 'Jane Smith',
    status: 'pending',
  },
];

// ⭐ Rating stars renderer
const renderStars = (count) => '⭐'.repeat(count) + '☆'.repeat(5 - count);

const ReviewManagement = () => {
  const handleReply = (customer) => {
    message.success(`Replied to ${customer}`);
  };

  const handleReport = (review) => {
    message.warning(`Reported review by ${review.customer}`);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      render: (rating) => <span>{renderStars(rating)}</span>,
    },
    {
      title: 'Review',
      dataIndex: 'comment',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) =>
        status === 'published' ? <Tag color="green">Published</Tag> : <Tag color="orange">Pending</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space direction="vertical">
          <TextArea
            rows={2}
            placeholder={`Reply to ${record.customer}...`}
            style={{ width: 200 }}
          />
          <Button
            className="custumcss textwhite"
            icon={<SendOutlined />}
            size="small"
            onClick={() => handleReply(record.customer)}
          >
            Send Reply
          </Button>
          <Popconfirm
            title="Report this review as fake?"
            onConfirm={() => handleReport(record)}
          >
            <Button
              danger
              icon={<WarningOutlined />}
              size="small"
            >
              Report Fake
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div >
      <h2>Review & Rating Management</h2>
      <Card title="Customer Reviews & Feedback" bordered={false}>
        <Table
          dataSource={reviewsData}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ReviewManagement;
