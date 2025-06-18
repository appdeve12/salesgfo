import React, { useRef, useState } from 'react';
import { Table, Tabs, Tag, Button, Space, Modal, Input, message } from 'antd';
import { PrinterOutlined, EyeOutlined, ReloadOutlined, TruckOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';

const { TabPane } = Tabs;

const Order = () => {
  const [orders, setOrders] = useState([
    {
      key: '1',
      orderId: 'ORD123456',
      customer: 'Anshika',
      status: 'Pending',
      date: '2025-06-17',
      address: 'New Delhi, India',
      items: '1x Laptop, 2x Mouse',
      tracking: '',
    },
    {
      key: '2',
      orderId: 'ORD123457',
      customer: 'Rahul',
      status: 'Shipped',
      date: '2025-06-16',
      address: 'Mumbai, India',
      items: '1x Monitor',
      tracking: 'AWB12345678',
    },
  ]);

  const [visibleOrder, setVisibleOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [showTrackingModal, setShowTrackingModal] = useState(false);

  const componentRef = useRef();

  const handlePrint = () => {
    if (componentRef.current) {
      html2pdf().from(componentRef.current).save(`${visibleOrder.orderId}-invoice.pdf`);
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

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => <Tag color={status === 'Pending' ? 'orange' : status === 'Cancelled' ? 'red' : 'green'}>{status}</Tag>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => setVisibleOrder(record)}>View</Button>
          {record.status === 'Pending' && (
            <Button icon={<ReloadOutlined />} onClick={() => handleProcess(record)}>Process</Button>
          )}
          <Button icon={<TruckOutlined />} onClick={() => { setVisibleOrder(record); setShowTrackingModal(true); }}>Tracking</Button>
          <Button icon={<PrinterOutlined />} onClick={() => { setVisibleOrder(record); handlePrint(); }}>Invoice</Button>
          <Button danger onClick={() => handleCancel(record)}>Cancel</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Order Management</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="New Orders" key="1">
          <Table dataSource={orders.filter(o => o.status === 'Pending')} columns={columns} />
        </TabPane>
        <TabPane tab="Processed Orders" key="2">
          <Table dataSource={orders.filter(o => o.status === 'Shipped')} columns={columns} />
        </TabPane>
        <TabPane tab="Returns / Cancellations" key="3">
          <Table dataSource={orders.filter(o => o.status === 'Cancelled')} columns={columns} />
        </TabPane>
      </Tabs>

      {visibleOrder && (
        <div style={{ display: 'none' }}>
          <div ref={componentRef} style={{ padding: 20 }}>
            <h3>Invoice for {visibleOrder.orderId}</h3>
            <p><b>Customer:</b> {visibleOrder.customer}</p>
            <p><b>Address:</b> {visibleOrder.address}</p>
            <p><b>Items:</b> {visibleOrder.items}</p>
            <p><b>Status:</b> {visibleOrder.status}</p>
            <p><b>Date:</b> {visibleOrder.date}</p>
          </div>
        </div>
      )}

      <Modal
        title="Add Tracking ID"
        open={showTrackingModal}
        onOk={handleAddTracking}
        onCancel={() => setShowTrackingModal(false)}
      >
        <Input value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)} placeholder="Enter tracking ID" />
      </Modal>
    </div>
  );
};

export default Order;
