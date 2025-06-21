import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs, Tag, Button, Space, Modal, Input, message } from 'antd';
import { PrinterOutlined, EyeOutlined, ReloadOutlined, TruckOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';

const { TabPane } = Tabs;

const Order = () => {
  const navigate = useNavigate();
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
      products: [{
        _id: 890,
        title: 'Wireless Earbuds',
        sku: 'SKU123456',
        handlingtime: '2025-06-25',
        restockdate: '2025-07-10',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 2499,
        discount: 10,
        category: 'electronics',
        brand: 'SoundTech',
        quantity: 50,
        inStock: true,
        tmBrandName: 'SoundTech™',
        tmReferenceNo: 'TM987654',
        media: [
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
        ]
      }]

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
      products: [
        {
        _id: 786,
        title: 'Wireless Earbuds',
        sku: 'SKU123456',
        handlingtime: '2025-06-25',
        restockdate: '2025-07-10',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 2499,
        discount: 10,
        category: 'electronics',
        brand: 'SoundTech',
        quantity: 50,
        inStock: true,
        tmBrandName: 'SoundTech™',
        tmReferenceNo: 'TM987654',
        media: [
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
        ]
      },
             {
        _id: 7866,
        title: 'Wireless Earbuds',
        sku: 'SKU123456',
        handlingtime: '2025-06-25',
        restockdate: '2025-07-10',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 2499,
        discount: 10,
        category: 'electronics',
        brand: 'SoundTech',
        quantity: 50,
        inStock: true,
        tmBrandName: 'SoundTech™',
        tmReferenceNo: 'TM987654',
        media: [
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
        ]
      },
    ]
    },
    {
      key: '3',
      orderId: 'ORD123458',
      customer: 'Anshika',
      status: 'Pending',
      date: '2025-06-17',
      address: 'New Delhi, India',
      items: '1x Laptop, 2x Mouse',
      tracking: '',
      products: [{
        _id: 78,
        title: 'Wireless Earbuds',
        sku: 'SKU123456',
        handlingtime: '2025-06-25',
        restockdate: '2025-07-10',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 2499,
        discount: 10,
        category: 'electronics',
        brand: 'SoundTech',
        quantity: 50,
        inStock: true,
        tmBrandName: 'SoundTech™',
        tmReferenceNo: 'TM987654',
        media: [
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
        ]
      }]
    },
    {
      key: '4',
      orderId: 'ORD123459',
      customer: 'Rahul',
      status: 'Cancelled',
      date: '2025-06-16',
      address: 'Mumbai, India',
      items: '1x Monitor',
      tracking: 'AWB12345678',
      products: [{
        _id: 567,
        title: 'Wireless Earbuds',
        sku: 'SKU123456',
        handlingtime: '2025-06-25',
        restockdate: '2025-07-10',
        description: 'High-quality wireless earbuds with noise cancellation.',
        price: 2499,
        discount: 10,
        category: 'electronics',
        brand: 'SoundTech',
        quantity: 50,
        inStock: true,
        tmBrandName: 'SoundTech™',
        tmReferenceNo: 'TM987654',
        media: [
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
          { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
        ]
      }]
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
          <Button icon={<TruckOutlined />} onClick={() => { setVisibleOrder(record); setShowTrackingModal(true); }}>
            Tracking
          </Button>
          {record.status === 'Shipped' && (
            <Button icon={<PrinterOutlined />} onClick={() => { setVisibleOrder(record); handlePrint(); }}>
              Invoice
            </Button>
          )}
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

          <Table
            dataSource={orders.filter(o => o.status === 'Pending')}
            columns={columns}
            onRow={(record) => ({
              onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
              style: { cursor: 'pointer' },
            })}
          />

        </TabPane>
        <TabPane tab="Processed Orders" key="2">
          <Table
            dataSource={orders.filter(o => o.status === 'Shipped')}
            columns={columns}
            onRow={(record) => ({
              onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
              style: { cursor: 'pointer' },
            })}
          />

        </TabPane>
        <TabPane tab="Returns / Cancellations" key="3">
          <Table
            dataSource={orders.filter(o => o.status === 'Cancelled')}
            columns={columns}
            onRow={(record) => ({
              onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
              style: { cursor: 'pointer' },
            })}
          />

        </TabPane>
      </Tabs>

      {visibleOrder && (
        <div style={{ display: 'none' }}>
          <div ref={componentRef} style={{ padding: 20, fontFamily: 'Arial', maxWidth: 600 }}>
            <h2 style={{ textAlign: 'center' }}>Order No. - {visibleOrder.orderId}</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4>Sold By:</h4>
                <p>KAY KAY OVERSEAS CORPORATION<br />
                  Gurgaon, Haryana, 122503, IN<br />
                  PAN No: AACFK0693D<br />
                  GST: 06AACFK0693D1ZN</p>
              </div>
              <div>
                <h4>Billing Address:</h4>
                <p>{visibleOrder.customer}<br />{visibleOrder.address}</p>
              </div>
              <div>
                <h4>Shipping Address:</h4>
                <p>{visibleOrder.customer}<br />{visibleOrder.address}</p>
              </div>
            </div>

            <p><b>Order Date:</b> {visibleOrder.date}</p>
            <p><b>Invoice Date:</b> {visibleOrder.date}</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }} border="1">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{visibleOrder.items}</td>
                  <td>₹392.37</td>
                  <td>1</td>
                  <td>₹106.63</td>
                  <td>₹699.00</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right' }}><b>Total Amount:</b></td>
                  <td><b>₹699.00</b></td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: 40 }}>
              <p><b>Authorized Signatory</b></p>
              <img src="https://i.ibb.co/jJM4x4b/signature.png" alt="Signature" width="120" />
            </div>
          </div>
        </div>
      )}


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
