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
    
        description: 'Customer claims that the order status hasn’t updated in 2 days.',
    },
    {
        key: 2,
        id: 'TCK-00124',
        issue: 'Refund not processed',
        status: 'Resolved',
        priority: 'Medium',
        createdAt: '2025-06-15',

        description: 'Buyer requested a refund but no amount was credited.',
    },
    {
        key: 3,
        id: 'TCK-00125',
        issue: 'Shipping delayed',
        status: 'In Progress',
        priority: 'Low',
        createdAt: '2025-06-16',
     
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

const [addModal, setAddModal] = useState(false);
const [tickets, setTickets] = useState(initialData); // replacing initialData directly
const [filteredData, setFilteredData] = useState(initialData); // Keep for filter/search

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
const handleAddTicket = (values) => {
    console.log("values",values)
    const newTicket = {
        key: tickets.length + 1,
        id: `TCK-${Math.floor(10000 + Math.random() * 90000)}`,
        issue: values.subject,
        description: values.description,
        status: 'Open',
        priority: 'Low',
        createdAt: new Date().toISOString().split('T')[0],
        agent: 'Unassigned',
        attachment: values.attachment?.file?.name || '',
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    setFilteredData(updated);
    setAddModal(false);
    message.success('New ticket added');
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
                   className="custumcss textwhite"
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
                <Button className="custumcss textwhite"onClick={() => setAddModal(true)}>
    + Add Ticket
</Button>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                variant
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
            {/* addticketmodel */}
            <Modal
    title="Add New Ticket"
    open={addModal}
    onCancel={() => setAddModal(false)}
    footer={null}
>
    <Form layout="vertical" onFinish={handleAddTicket}>
        <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
        >
            <Input placeholder="Enter subject" />
        </Form.Item>

        <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter a description' }]}
        >
            <TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item label="Attachment" name="attachment" valuePropName="file">
            <Input type="file" />
        </Form.Item>

        <Form.Item>
            <Button className='custumcss textwhite' htmlType="submit">
                Submit Ticket
            </Button>
        </Form.Item>
    </Form>
</Modal>

        </Card>
    );
};

export default SupportTickets;
