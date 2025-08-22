
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
import { BASE_URL } from "../../services/apiRoutes";
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
const image = product.images?.[0] ? `${BASE_URL}${product.images[0]}` : "";

        console.log("image",image);
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
  render: (img) => {
    console.log(img); // Log the img value
    return (
      <Image
        src={img}
        width={60}
        height={60}
        alt="product"
      />
    );
  },
}
,
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
