import React, { useState } from 'react';
import {
    Card,
    Typography,
    Table,
    Tag,
    Button,
    Select,
    Input,
    Space,
    Modal,
    Form,
    message,
} from 'antd';
import { EyeOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { Search, TextArea } = Input;

const initialData = [
    {
        key: 1,
        id: 'TCK-00123',
        issue: 'Buyer not receiving order update',
        status: 'Open',
        priority: 'High',
        createdAt: '2025-06-18',
        agent: 'Support Team A',
        description: 'Customer claims that the order status hasn’t updated in 2 days.',
    },
    {
        key: 2,
        id: 'TCK-00124',
        issue: 'Refund not processed',
        status: 'Resolved',
        priority: 'Medium',
        createdAt: '2025-06-15',
        agent: 'Support Team B',
        description: 'Buyer requested a refund but no amount was credited.',
    },
    {
        key: 3,
        id: 'TCK-00125',
        issue: 'Shipping delayed',
        status: 'In Progress',
        priority: 'Low',
        createdAt: '2025-06-16',
        agent: 'Support Team C',
        description: 'Item stuck in transit for more than 5 days.',
    },
];

const statusColors = {
    Open: 'red',
    Resolved: 'green',
    'In Progress': 'blue',
};

const priorityColors = {
    High: 'volcano',
    Medium: 'gold',
    Low: 'geekblue',
};

const SupportTickets = () => {
    const [statusFilter, setStatusFilter] = useState('All');
    const [filteredData, setFilteredData] = useState(initialData);

    const [viewModal, setViewModal] = useState(false);
    const [replyModal, setReplyModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    const handleStatusChange = (value) => {
        setStatusFilter(value);
        setFilteredData(
            value === 'All' ? initialData : initialData.filter((t) => t.status === value)
        );
    };

    const handleReplySubmit = () => {
        message.success(`Reply sent to ticket ${selectedTicket.id}`);
        setReplyModal(false);
        setReplyMessage('');
    };

    const columns = [
        {
            title: 'Ticket ID',
            dataIndex: 'id',
            render: (id) => <strong>{id}</strong>,
        },
        {
            title: 'Issue',
            dataIndex: 'issue',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            render: (priority) => <Tag color={priorityColors[priority]}>{priority}</Tag>,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Assigned To',
            dataIndex: 'agent',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                            setSelectedTicket(record);
                            setViewModal(true);
                        }}
                    >
                        View
                    </Button>
                    <Button
                        icon={<MessageOutlined />}
                        size="small"
                        type="primary"
                        onClick={() => {
                            setSelectedTicket(record);
                            setReplyModal(true);
                        }}
                    >
                        Reply
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Title level={4}>Support Tickets</Title>

            <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }} wrap>
                <Search
                    placeholder="Search tickets..."
                    onSearch={(value) => {
                        const filtered = initialData.filter((ticket) =>
                            ticket.id.includes(value) ||
                            ticket.issue.toLowerCase().includes(value.toLowerCase())
                        );
                        setFilteredData(filtered);
                    }}
                    style={{ width: 250 }}
                />
                <Select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    style={{ width: 180 }}
                >
                    <Option value="All">All Statuses</Option>
                    <Option value="Open">Open</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Resolved">Resolved</Option>
                </Select>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                bordered
                size="middle"
            />

            {/* View Modal */}
            <Modal
                title={`Ticket Details: ${selectedTicket?.id}`}
                open={viewModal}
                onCancel={() => setViewModal(false)}
                footer={null}
            >
                <p><strong>Issue:</strong> {selectedTicket?.issue}</p>
                <p><strong>Description:</strong> {selectedTicket?.description}</p>
                <p><strong>Status:</strong> {selectedTicket?.status}</p>
                <p><strong>Priority:</strong> {selectedTicket?.priority}</p>
                <p><strong>Created At:</strong> {selectedTicket?.createdAt}</p>
                <p><strong>Assigned To:</strong> {selectedTicket?.agent}</p>
            </Modal>

            {/* Reply Modal */}
            <Modal
                title={`Reply to Ticket: ${selectedTicket?.id}`}
                open={replyModal}
                onCancel={() => setReplyModal(false)}
                onOk={handleReplySubmit}
                okText="Send Reply"
            >
                <Form layout="vertical">
                    <Form.Item label="Message">
                        <TextArea
                            rows={4}
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Type your reply here..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default SupportTickets;
