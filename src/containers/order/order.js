
//          import React, { useRef, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Table, Tabs, Tag, Button, Space, Modal, Input, message } from 'antd';
// import { PrinterOutlined, EyeOutlined, ReloadOutlined, TruckOutlined } from '@ant-design/icons';
// import html2pdf from 'html2pdf.js';
// import Spinner from '../../components/Spinner';

// const { TabPane } = Tabs;

// const Order = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//          const [orders, setOrders] = useState([
//     {
//       key: '1',
//       orderId: 'ORD123456',
//       customer: 'Anshika',
//       status: 'Pending',
//       date: '2025-06-17',
//       address: 'New Delhi, India',
//       items: '1x Laptop, 2x Mouse',
//       tracking: '',
//       products: [{
//         _id: 890,
//         title: 'Wireless Earbuds',
//         sku: 'SKU123456',
//         handlingtime: '2025-06-25',
//         restockdate: '2025-07-10',
//         description: 'High-quality wireless earbuds with noise cancellation.',
//         price: 2499,
//         discount: 10,
//         category: 'electronics',
//         brand: 'SoundTech',
//         quantity: 50,
//         inStock: true,
//         tmBrandName: 'SoundTech™',
//         tmReferenceNo: 'TM987654',
//         media: [
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
//         ]
//       }]

//     },
//     {
//       key: '2',
//       orderId: 'ORD123457',
//       customer: 'Rahul',
//       status: 'Shipped',
//       date: '2025-06-16',
//       address: 'Mumbai, India',
//       items: '1x Monitor',
//       tracking: 'AWB12345678',
//       products: [
//         {          _id: 786,
//           title: 'Wireless Earbuds',
//           sku: 'SKU123456',
//           handlingtime: '2025-06-25',
//           restockdate: '2025-07-10',
//           description: 'High-quality wireless earbuds with noise cancellation.',
//           price: 2499,
//           discount: 10,
//           category: 'electronics',
//           brand: 'SoundTech',
//           quantity: 50,
//           inStock: true,
//           tmBrandName: 'SoundTech™',
//           tmReferenceNo: 'TM987654',
//           media: [
//             { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//             { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//             { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
//           ]
//         },
//         {
//           _id: 7866,
//           title: 'Wireless Earbuds',
//           sku: 'SKU123456',
//           handlingtime: '2025-06-25',
//           restockdate: '2025-07-10',
//           description: 'High-quality wireless earbuds with noise cancellation.',
//           price: 2499,
//           discount: 10,
//           category: 'electronics',
//           brand: 'SoundTech',
//           quantity: 50,
//           inStock: true,
//           tmBrandName: 'SoundTech™',
//           tmReferenceNo: 'TM987654',
//           media: [
//             { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//             { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//             { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
//           ]
//         },
//       ]
//     },
//                  {
//       key: '3',
//       orderId: 'ORD123458',
//       customer: 'Anshika',
//       status: 'Pending',
//       date: '2025-06-17',
//       address: 'New Delhi, India',
//       items: '1x Laptop, 2x Mouse',
//       tracking: '',
//       products: [{
//         _id: 78,
//         title: 'Wireless Earbuds',
//         sku: 'SKU123456',
//         handlingtime: '2025-06-25',
//         restockdate: '2025-07-10',
//         description: 'High-quality wireless earbuds with noise cancellation.',
//         price: 2499,
//         discount: 10,
//         category: 'electronics',
//         brand: 'SoundTech',
//         quantity: 50,
//         inStock: true,
//         tmBrandName: 'SoundTech™',
//         tmReferenceNo: 'TM987654',
//         media: [
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
//         ]
//       }]
//     },
//     {
//       key: '4',
//       orderId: 'ORD123459',
//       customer: 'Rahul',
//       status: 'Cancelled',
//       date: '2025-06-16',
//       address: 'Mumbai, India',
//       items: '1x Monitor',
//       tracking: 'AWB12345678',
//       products: [{
//         _id: 567,
//         title: 'Wireless Earbuds',
//         sku: 'SKU123456',
//         handlingtime: '2025-06-25',
//         restockdate: '2025-07-10',
//         description: 'High-quality wireless earbuds with noise cancellation.',
//         price: 2499,
//         discount: 10,
//         category: 'electronics',
//         brand: 'SoundTech',
//         quantity: 50,
//         inStock: true,
//         tmBrandName: 'SoundTech™',
//         tmReferenceNo: 'TM987654',
//         media: [
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'image', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' },
//           { type: 'video', url: 'https://m.media-amazon.com/images/I/61ZE0ilkdcL._AC_UF1000,1000_QL80_.jpg' }
//         ]
//       }]
//     },
//   ]);

//   const [visibleOrder, setVisibleOrder] = useState(null);
//   const [trackingInput, setTrackingInput] = useState('');
//   const [showTrackingModal, setShowTrackingModal] = useState(false);

//   const componentRef = useRef();

//   const handlePrint = () => {
//     if (componentRef.current) {
//       html2pdf().from(componentRef.current).set({
//         margin: 0.5,
//         filename: `${visibleOrder.orderId}-invoice.pdf`,
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//       }).save();
//     }
//   };

//   const handleProcess = (record) => {
//     Modal.confirm({
//       title: 'Mark this order as Shipped?',
//       onOk: () => {
//         setOrders(prev => prev.map(o => o.key === record.key ? { ...o, status: 'Shipped' } : o));
//         message.success('Order marked as shipped');
//       },
//     });
//   };

//   const handleCancel = (record) => {
//     Modal.confirm({
//       title: 'Cancel this order?',
//       onOk: () => {
//         setOrders(prev => prev.map(o => o.key === record.key ? { ...o, status: 'Cancelled' } : o));
//         message.success('Order cancelled');
//       },
//     });
//   };

//   const handleAddTracking = () => {
//     setOrders(prev => prev.map(o => o.key === visibleOrder.key ? { ...o, tracking: trackingInput } : o));
//     setShowTrackingModal(false);
//     message.success('Tracking ID added');
//   };

//   const columns = [
//     {
//       title: 'Order ID',
//       dataIndex: 'orderId',
//     },
//     {
//       title: 'Customer',
//       dataIndex: 'customer',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: status => <Tag color={status === 'Pending' ? 'orange' : status === 'Cancelled' ? 'red' : 'green'}>{status}</Tag>,
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//     },
//     {
//       title: 'Actions',
//       render: (_, record) => (
//         <Space>
//           <Button icon={<EyeOutlined />} onClick={() => setVisibleOrder(record)}>View</Button>
//           {record.status === 'Pending' && (
//              <Button icon={<ReloadOutlined />} onClick={(e) => { e.stopPropagation(); handleProcess(record) }}>Process</Button>
//           )}
//        <Button icon={<TruckOutlined />} onClick={(e) => { e.stopPropagation(); setVisibleOrder(record); setShowTrackingModal(true); }}>
//             Tracking
//           </Button>
//           {record.status === 'Shipped' && (
//                <Button icon={<PrinterOutlined />} onClick={(e) => { e.stopPropagation(); setVisibleOrder(record); handlePrint(e); }}>
//               Invoice
//             </Button>
//           )}

//            <Button danger onClick={(e) => { e.stopPropagation(); handleCancel(record) }}>Cancel</Button>
//         </Space>
//       ),
//     },
//   ];
//    useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       <h2>Order Management</h2>
//       <Tabs defaultActiveKey="1">
//         <TabPane tab="New Orders" key="1">

//           <Table
//             dataSource={orders.filter(o => o.status === 'Pending')}
//             columns={columns}
//             onRow={(record) => ({
//               onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
//               style: { cursor: 'pointer' },
//             })}
//           />

//         </TabPane>
//         <TabPane tab="Processed Orders" key="2">
//           <Table
//             dataSource={orders.filter(o => o.status === 'Shipped')}
//             columns={columns}
//             onRow={(record) => ({
//               onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
//               style: { cursor: 'pointer' },
//             })}
//           />

//         </TabPane>
//         <TabPane tab="Returns / Cancellations" key="3">
//           <Table
//             dataSource={orders.filter(o => o.status === 'Cancelled')}
//             columns={columns}
//             onRow={(record) => ({
//               onClick: () => navigate(`/orders/${record.orderId}`, { state: { order: record } }),
//               style: { cursor: 'pointer' },
//             })}
//           />

//         </TabPane>
//       </Tabs>

//       {visibleOrder && (
//         <div style={{ display: 'none' }}>
//           <div ref={componentRef} style={{ padding: 20, fontFamily: 'Arial', maxWidth: 600 }}>
//             <h2 style={{ textAlign: 'center' }}>Order No. - {visibleOrder.orderId}</h2>

//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <div>
//                 <h4>Sold By:</h4>
//                 <p>KAY KAY OVERSEAS CORPORATION<br />
//                   Gurgaon, Haryana, 122503, IN<br />
//                   PAN No: AACFK0693D<br />
//                   GST: 06AACFK0693D1ZN</p>
//               </div>
//               <div>
//                 <h4>Billing Address:</h4>
//                 <p>{visibleOrder.customer}<br />{visibleOrder.address}</p>
//               </div>
//               <div>
//                 <h4>Shipping Address:</h4>
//                 <p>{visibleOrder.customer}<br />{visibleOrder.address}</p>
//               </div>
//             </div>

//             <p><b>Order Date:</b> {visibleOrder.date}</p>
//             <p><b>Invoice Date:</b> {visibleOrder.date}</p>

//             <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }} border="1">
//               <thead>
//                 <tr>
//                   <th>Description</th>
//                   <th>Unit Price</th>
//                   <th>Qty</th>
//                   <th>Tax</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{visibleOrder.items}</td>
//                   <td>₹392.37</td>
//                   <td>1</td>
//                   <td>₹106.63</td>
//                   <td>₹699.00</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="4" style={{ textAlign: 'right' }}><b>Total Amount:</b></td>
//                   <td><b>₹699.00</b></td>
//                 </tr>
//               </tbody>
//             </table>

//             <div style={{ marginTop: 40 }}>
//               <p><b>Authorized Signatory</b></p>
//               <img src="https://i.ibb.co/jJM4x4b/signature.png" alt="Signature" width="120" />
//             </div>
//           </div>
//         </div>
//       )}


//       {/* Tracking ID Modal */}
//       <Modal
//         title="Add Tracking ID"
//         open={showTrackingModal}
//         onOk={handleAddTracking}
//         onCancel={() => setShowTrackingModal(false)}
//       >
//         <Input
//           value={trackingInput}
//           onChange={(e) => setTrackingInput(e.target.value)}
//           placeholder="Enter tracking ID"
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Order;
// import React, { useState, useEffect } from "react";
// import { fetchallorderwithqueriesparameter } from "../../services/allService";
// import { Table, Tabs, message, Typography, Image, Spin } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { storeallorder, storeparticularOrder } from "../../redux/orderSlice";
// const { TabPane } = Tabs;
// const { Text } = Typography;

// const Order = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//     const componentRef = useRef();

//   const [activetab, setactivetab] = useState("pending");
//   const [order, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const filter = { status: activetab };
//       const response = await fetchallorderwithqueriesparameter(filter);
//       if (response.status === 200) {
//         const orders = response.data.orders || [];
//         dispatch(storeallorder(response.data.orders))
//         parsedatafunction(orders);
//       } else {
//         message.error("Failed to fetch orders.");
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       message.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parsedatafunction = (orders) => {
//     const parsed = orders.map((order) => {
//       const orderId = order.orderId;
//       const buyerName = order.buyer?.fullName || "N/A";
//       const placedAt = new Date(order.placedAt);
//       const expectedDeliveryDate = new Date(order.expectedDeliveryDate);

//       const items = order.items.map((item) => {
//         const product = item.product || {};
//         const productTitle = product.name || "Unnamed Product";
//         const sku = product.variations?.[0]?.sku || "N/A";
//         const image = product.images?.[0] || "";
//         const quantity = item.quantity;
//         const price = item.priceAtPurchase;
//         const subtotal = price * quantity;

//         return {
//           productTitle,
//           sku,
//           image,
//           quantity,
//           subtotal,
//           asin: product._id,
//           productType: product.productType,
//         };
//       });

//       return {
//         key: order._id,
//         orderId,
//         buyerName,
//         placedAt,
//         expectedDeliveryDate,
//         status: order.status,
//         paymentStatus: order.paymentStatus,
//         deliveryOption: order.deliveryOption,
//         shippingAddress: order.shippingAddress,
//         items,
//       };
//     });

//     setOrders(parsed);
//   };
//   const gotonavigate = (data) => {
//     console.log(data)
//     dispatch(storeparticularOrder(data))
//     navigate(`/orders/${data.key}`)

//   }
//   useEffect(() => {
//     fetchOrders();
//   }, [activetab]);

//   const orderColumns = [
//     {
//       title: "Order ID",
//       dataIndex: "orderId",
//       key: "orderId",
//     },
//     {
//       title: "Buyer",
//       dataIndex: "buyerName",
//       key: "buyerName",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//     },
//     {
//       title: "Payment",
//       dataIndex: "paymentStatus",
//       key: "paymentStatus",
//     },
//     {
//       title: "Placed",
//       dataIndex: "placedAt",
//       render: (date) => formatDate(date),
//     },
//     {
//       title: "Expected Delivery",
//       dataIndex: "expectedDeliveryDate",
//       render: (date) => formatDate(date),
//     },
//   ];

//   const expandedRowRender = (record) => {
//     return (
//       <Table
//         dataSource={record.items}
//         rowKey={(record) => record.asin}
//         pagination={false}
//         columns={[
//           {
//             title: "Image",
//             dataIndex: "image",
//             render: (img) => (
//               <Image src={img} width={60} height={60} alt="product" />
//             ),
//           },
//           {
//             title: "Title",
//             dataIndex: "productTitle",
//           },
//           {
//             title: "ASIN",
//             dataIndex: "asin",
//           },
//           {
//             title: "SKU",
//             dataIndex: "sku",
//           },
//           {
//             title: "Quantity",
//             dataIndex: "quantity",
//           },
//           {
//             title: "Subtotal",
//             dataIndex: "subtotal",
//             render: (val) => `₹${val}`,
//           },
//           {
//             title: "Type",
//             dataIndex: "productType",
//           },
//         ]}
//       />
//     );
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <>
//       <Tabs
//         defaultActiveKey="pending"
//         activeKey={activetab}
//         onChange={(key) => setactivetab(key)}
//         style={{ marginBottom: 20 }}
//       >
//         <TabPane tab="New" key="pending" />
//         <TabPane tab="Processing" key="processing" />
//         <TabPane tab="Shipped" key="shipped" />
//         <TabPane tab="Delivered" key="delivered" />
//         <TabPane tab="Cancelled" key="cancelled" />
//         <TabPane tab="Returned" key="returned" />
//       </Tabs>

//       <Spin spinning={loading}>
//         <Table
//           dataSource={order}
//           columns={orderColumns}
//           expandable={{ expandedRowRender }}
//           pagination={{ pageSize: 5 }}
//           rowKey="key"
//           bordered
//           onRow={(record) => ({
//             onClick: () => gotonavigate(record),


//           })}
//         />
//       </Spin>
//     </>
//   );
// };

// export default Order;
import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Tabs,
  message,
  Typography,
  Image,
  Spin,
  Button
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeallorder, storeparticularOrder } from "../../redux/orderSlice";
import { fetchallorderwithqueriesparameter } from "../../services/allService";
import html2pdf from "html2pdf.js";

const { TabPane } = Tabs;
const { Text } = Typography;


const Order = () => {

  const userdata = useSelector((state) => state.auth.userdata);
  console.log("userdata", userdata)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activetab, setactivetab] = useState("pending");
  const [orderresponse, setOrdersresponse] = useState([]);
  const [order, setOrders] = useState([]);
  const [visibleOrder, setVisibleOrder] = useState(null);
  console.log("visibleOrder", visibleOrder)
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const fetchDefaultAddress = () => {
  return visibleOrder?.buyer?.addresses.find(item => item.isDefault === true);
};

const defaultAddress = fetchDefaultAddress();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const filter = { status: activetab };
      const response = await fetchallorderwithqueriesparameter(filter);
      if (response.status === 200) {
        const orders = response.data.orders || [];
        dispatch(storeallorder(orders));
        setOrdersresponse(orders)
        parsedatafunction(orders);
      } else {
        message.error("Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      message.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const parsedatafunction = (orders) => {
    const parsed = orders.map((order) => {
      const orderId = order.orderId;
      const buyerName = order.buyer?.fullName || "N/A";
      const placedAt = new Date(order.placedAt);
      const expectedDeliveryDate = new Date(order.expectedDeliveryDate);

      const items = order.items.map((item) => {
        const product = item.product || {};
        const productTitle = product.name || "Unnamed Product";
        const sku = product.variations?.[0]?.sku || "N/A";
        const image = product.images?.[0] || "";
        const quantity = item.quantity;
        const price = item.priceAtPurchase;
        const subtotal = price * quantity;

        return {
          productTitle,
          sku,
          image,
          quantity,
          subtotal,
          asin: product._id,
          productType: product.productType,
        };
      });

      return {
        key: order._id,
        orderId,
        buyerName,
        placedAt,
        expectedDeliveryDate,
        status: order.status,
        paymentStatus: order.paymentStatus,
        deliveryOption: order.deliveryOption,
        shippingAddress: order.shippingAddress,
        items,
      };
    });

    setOrders(parsed);
  };
  const handlePrint = () => {
    if (componentRef.current) {
      html2pdf()
        .from(componentRef.current)
        .set({
          margin: 0.5,
          filename: `${visibleOrder?.orderId || 'invoice'}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  const gotonavigate = (data) => {
    dispatch(storeparticularOrder(data));
    navigate(`/orders/${data.key}`);
  };

  useEffect(() => {
    fetchOrders();
  }, [activetab]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const orderColumns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Buyer",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Placed",
      dataIndex: "placedAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Expected Delivery",
      dataIndex: "expectedDeliveryDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          {record.status === "shipped" && (
            <Button
              icon={<PrinterOutlined />}
              onClick={(e) => {
                e.stopPropagation();

                const visibleObject = orderresponse.find((item) => item._id === record.key);
                setVisibleOrder(visibleObject);

                // Wait for state to update and component to render before printing
                setTimeout(() => {
                  handlePrint();
                }, 100); // slight delay ensures ref is updated
              }}
            >
              Invoice
            </Button>

          )}
        </>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <Table
        dataSource={record.items}
        rowKey={(record) => record.asin}
        pagination={false}
        columns={[
          {
            title: "Image",
            dataIndex: "image",
            render: (img) => (
              <Image src={img} width={60} height={60} alt="product" />
            ),
          },
          {
            title: "Title",
            dataIndex: "productTitle",
          },
          {
            title: "ASIN",
            dataIndex: "asin",
          },
          {
            title: "SKU",
            dataIndex: "sku",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Subtotal",
            dataIndex: "subtotal",
            render: (val) => `₹${val}`,
          },
          {
            title: "Type",
            dataIndex: "productType",
          },
        ]}
      />
    );
  };

  return (
    <>
      <Tabs
        defaultActiveKey="pending"
        activeKey={activetab}
        onChange={(key) => setactivetab(key)}
        style={{ marginBottom: 20 }}
      >
        <TabPane tab="New" key="pending" />
        <TabPane tab="Processing" key="processing" />
        <TabPane tab="Shipped" key="shipped" />
        <TabPane tab="Delivered" key="delivered" />
        <TabPane tab="Cancelled" key="cancelled" />
        <TabPane tab="Returned" key="returned" />
      </Tabs>

      <Spin spinning={loading}>
        <Table
          dataSource={order}
          columns={orderColumns}
          expandable={{ expandedRowRender }}
          pagination={{ pageSize: 5 }}
          rowKey="key"
          bordered
          onRow={(record) => ({
            onClick: () => gotonavigate(record),
          })}
        />
      </Spin>

      {/* Invoice DOM for PDF (hidden) */}
      {visibleOrder &&   <>
        <div ref={componentRef} style={{ padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '12px', color: '#000', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Fire Safety</h2>
          <h4 style={{ textAlign: 'center', marginTop: 4 }}>Tax Invoice/Bill of Supply/Cash Memo</h4>
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>(Original for Recipient)</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div>
              <h4>Sold By:</h4>
              <p>
                {userdata?.businessName}<br />
                {userdata?.businessAddress}.<br />


                GST: {userdata?.gstNumber}
              </p>
            </div>
            <div>
              <h4>Billing Address:</h4>
              <p>
                {visibleOrder?.buyer?.fullName}<br />
                {defaultAddress && (
                  <p>
                    {defaultAddress.fullAddress}, {defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}
                  </p>
                )}

              </p>
            </div>
            <div>
              <h4>Shipping Address:</h4>
              <p>
                {/* Naman Agarwal<br /> */}
                {visibleOrder?.shippingAddress.fullAddress},{visibleOrder?.shippingAddress.city},{visibleOrder?.shippingAddress.state}-{visibleOrder?.shippingAddress.pincode}<br />

              </p>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <p><strong>Order Number:</strong> {visibleOrder.orderId}</p>
            <p><strong>Order Date:</strong> {visibleOrder.placedAt}</p>
            <p><strong>Invoice Number:</strong> SDEG-143068</p>
            <p><strong>Invoice Date:</strong> 10/10/2023</p>
            <p><strong>Place of Supply:</strong> {visibleOrder.shippingAddress.state}</p>
            {/* <p><strong>Place of Delivery:</strong> Rajasthan</p> */}
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }} border="1">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Net Amount</th>
                <th>Tax Rate</th>
                <th>Tax Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrder.items.map((item, index) => {
                const unitPrice = item.priceAtPurchase; // price per unit at purchase
                const qty = item.quantity;
                const taxAmount = item.gstAmount || 0;
                const netAmount = unitPrice * qty;
                const totalAmount = netAmount + taxAmount;

                // Calculate tax rate if possible
                const taxRate = taxAmount > 0 ? ((taxAmount / netAmount) * 100).toFixed(2) + '%' : '0%';

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.product.name}</td>
                    <td>₹{unitPrice.toFixed(2)}</td>
                    <td>{qty}</td>
                    <td>₹{netAmount.toFixed(2)}</td>
                    <td>{taxRate} IGST</td>
                    <td>₹{taxAmount.toFixed(2)}</td>
                    <td>₹{totalAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="7" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Amount</td>
                <td style={{ fontWeight: 'bold' }}>₹{visibleOrder.totalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>


          {/* <p style={{ marginTop: 10 }}><strong>Total (in words):</strong> Seventy-two Thousand Nine Hundred Ninety-nine only</p>
        <p><strong>Tax payable under reverse charge:</strong> No</p> */}

          <h4 style={{ marginTop: 30 }}>Payment Details</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>Invoice Value</th>
                <th>Mode of Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1111bza2HLCga0TrH9qcUj</td>
                <td>08/10/2023, 10:23:08</td>
                <td>₹72,999.00</td>
                <td>GiftCard</td>
              </tr>
              <tr>
                <td>1111NosaMYFppWpVlCHRaEn</td>
                <td>08/10/2023, 10:23:06</td>
                <td>-</td>
                <td>Promotion</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: 40 }}>
            <p><strong>For  {userdata?.businessName}</strong></p>
            <p><em>Authorized Signatory</em></p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={handlePrint}>Download Invoice PDF</button>
        </div>
      </>}
    
    </>
  );
};

export default Order;
