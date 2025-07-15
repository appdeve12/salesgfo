import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs, Tag, Button, Space, Modal, Input, message, DatePicker } from 'antd';
import { PrinterOutlined, EyeOutlined, ReloadOutlined, TruckOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';
import Spinner from '../../components/Spinner';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Order = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([]);

  const [orders, setOrders] = useState([
    {
      key: '1',
      orderId: 'ORD123456',
      customer: 'Anshika',
      status: 'Pending',
      date: '2025-06-17',
      address: 'New Delhi, India',
      items: '1x Laptop, 2x Mouse',
      tracking: ''
    },
    {
      key: '2',
      orderId: 'ORD123457',
      customer: 'Rahul',
      status: 'Shipped',
      date: '2025-06-16',
      address: 'Mumbai, India',
      items: '1x Monitor',
      tracking: 'AWB12345678'
    },
    {
      key: '3',
      orderId: 'ORD123458',
      customer: 'Anshika',
      status: 'Pending',
      date: '2025-06-17',
      address: 'New Delhi, India',
      items: '1x Laptop, 2x Mouse',
      tracking: ''
    },
    {
      key: '4',
      orderId: 'ORD123459',
      customer: 'Rahul',
      status: 'Cancelled',
      date: '2025-06-16',
      address: 'Mumbai, India',
      items: '1x Monitor',
      tracking: 'AWB12345678'
    },
  ]);

  const [visibleOrder, setVisibleOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const componentRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      html2pdf().from(componentRef.current).set({
        margin: 0.5,
        filename: `${visibleOrder.orderId}-invoice.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
    }
  };

  const handleProcess = (record) => {
    Modal.confirm({
      title: 'Mark this order as Shipped?',
      onOk: () => {
        setOrders(prev => prev.map(o => o.key === record.key ? { ...o, status: 'Shipped' } : o));
        message.success('Order marked as shipped');
      },
    });
  };

  const handleCancel = (record) => {
    Modal.confirm({
      title: 'Cancel this order?',
      onOk: () => {
        setOrders(prev => prev.map(o => o.key === record.key ? { ...o, status: 'Cancelled' } : o));
        message.success('Order cancelled');
      },
    });
  };

  const handleAddTracking = () => {
    setOrders(prev => prev.map(o => o.key === visibleOrder.key ? { ...o, tracking: trackingInput } : o));
    setShowTrackingModal(false);
    message.success('Tracking ID added');
  };

const filterByDate = (data) => {
  if (!dateRange || dateRange.length !== 2) return data;

  const [start, end] = dateRange;
  return data.filter(order => {
    const orderDate = dayjs(order.date, 'YYYY-MM-DD');
    return orderDate.isSameOrAfter(start, 'day') && orderDate.isSameOrBefore(end, 'day');
  });
};

  const columns = [
    { title: 'Order ID', dataIndex: 'orderId' },
    { title: 'Customer', dataIndex: 'customer' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => <Tag color={status === 'Pending' ? 'orange' : status === 'Cancelled' ? 'red' : 'green'}>{status}</Tag>,
    },
    { title: 'Date', dataIndex: 'date' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => setVisibleOrder(record)}>View</Button>
          {record.status === 'Pending' && (
            <Button icon={<ReloadOutlined />} onClick={(e) => { e.stopPropagation(); handleProcess(record) }}>Process</Button>
          )}
          <Button icon={<TruckOutlined />} onClick={(e) => { e.stopPropagation(); setVisibleOrder(record); setShowTrackingModal(true); }}>
            Tracking
          </Button>
          {record.status === 'Shipped' && (
            <Button icon={<PrinterOutlined />} onClick={(e) => { e.stopPropagation(); setVisibleOrder(record); handlePrint(e); }}>
              Invoice
            </Button>
          )}
          <Button danger onClick={(e) => { e.stopPropagation(); handleCancel(record) }}>Cancel</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const tabItems = [
    {
      key: '1',
      label: 'New Orders',
      children: (
        <Table
          dataSource={filterByDate(orders.filter(o => o.status === 'Pending'))}
          columns={columns}
          rowKey="key"
        />
      ),
    },
    {
      key: '2',
      label: 'Processed Orders',
      children: (
        <Table
          dataSource={filterByDate(orders.filter(o => o.status === 'Shipped'))}
          columns={columns}
          rowKey="key"
        />
      ),
    },
    {
      key: '3',
      label: 'Returns / Cancellations',
      children: (
        <Table
          dataSource={filterByDate(orders.filter(o => o.status === 'Cancelled'))}
          columns={columns}
          rowKey="key"
        />
      ),
    },
  ];

  if (loading) return <Spinner />;

  return (
    <div>
      <h2>Order Management</h2>
      <RangePicker onChange={setDateRange} style={{ marginBottom: 16 }} />
      <Tabs defaultActiveKey="1" items={tabItems} />

      {/* Tracking ID Modal */}
      <Modal
        title="Add Tracking ID"
        open={showTrackingModal}
        onOk={handleAddTracking}
        onCancel={() => setShowTrackingModal(false)}
      >
        <Input
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
          placeholder="Enter tracking ID"
        />
      </Modal>
    </div>
  );
};

export default Order;
