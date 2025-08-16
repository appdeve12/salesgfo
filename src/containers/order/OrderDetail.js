import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useParams,
  useNavigate,
  Link
} from 'react-router-dom';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Row,
  Col,
  Image,
  Typography,
  Divider,
  Tabs,
  Breadcrumb,
  Form,
  Radio,
  Select,
  Input,
  message
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateorderstatus } from '../../services/allService';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const allOrders = useSelector(state => state.order.allorder);

  const [order, setOrder] = useState(null);
  console.log("foundordr",order)
  const [shippingMethod, setShippingMethod] = useState('Courier-Partner');

  useEffect(() => {
    const foundOrder = allOrders.find(order => order._id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      message.error('Order not found.');
    }
  }, [orderId, allOrders]);

  const breadcrumbItems = [
    {
      title: <Link to="/order">Orders</Link>,
    },
    {
      title: `Order Details - ${order?.orderId || ''}`,
    },
  ];

  const handleShippingSubmit = async (values) => {
    try {
      const payload = {
  status:"processing",
        // shippingMethod: values.shippingMethod,
        trackingId: values.trackingId || null,
        CourierPartner: values.courierPartner || null,
        deliveryOption:"express"
      };

      const response=await updateorderstatus(payload,orderId)
console.log("response",response)
  if(response.status==200){
navigate(`/order`)
  }
    } catch (err) {
      console.error(err);
      message.error('Something went wrong');
    }
  };

  if (!order) return <p>Loading order details...</p>;

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />
      <Row gutter={12}>
        <Col span={12}>
          <Card className='custom-padding' variant={false}>
            <Descriptions column={1}>
              <Descriptions.Item label="Customer">{order?.buyer?.fullName || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {order?.placedAt ? new Date(order.placedAt).toLocaleString() : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={
                  order?.status?.toLowerCase() === 'pending' ? 'orange' :
                  order?.status?.toLowerCase() === 'shipped' ? 'green' : 'red'
                }>
                  {order.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Shipping Address">
                {order?.shippingAddress?.fullAddress || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">₹{order.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="Tracking ID">{order.tracking || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>

          {order.status?.toLowerCase() === 'pending' && (
            <Card title="Confirm & Ship Order" style={{ marginTop: 16 }}>
              <Form
                layout="vertical"
                onFinish={handleShippingSubmit}
                initialValues={{ shippingMethod: 'Courier-Partner' }}
              >
                <Form.Item
                  name="shippingMethod"
                  label="Shipping Method"
                  rules={[{ required: true, message: 'Select shipping method' }]}
                >
                  <Radio.Group onChange={(e) => setShippingMethod(e.target.value)}>
                    {/* <Radio value="Self-Ship">Self Ship</Radio> */}
                    <Radio value="Courier-Partner">Courier Partner</Radio>
                  </Radio.Group>
                </Form.Item>

                {/* {shippingMethod === 'Self-Ship' && (
                  <Form.Item
                    name="trackingId"
                    label="Tracking ID"
                    rules={[{ required: true, message: 'Enter tracking ID' }]}
                  >
                    <Input placeholder="Enter tracking number" />
                  </Form.Item>
                )} */}

                {shippingMethod === 'Courier-Partner' && (
                  <>
                    <Form.Item
                      name="courierPartner"
                      label="Courier Partner"
                      rules={[{ required: true, message: 'Select courier partner' }]}
                    >
                      <Select placeholder="Select courier">
                        <Select.Option value="Delhivery">Delhivery</Select.Option>
                        <Select.Option value="Shiprocket">Shiprocket</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="trackingId"
                      label="Tracking ID"
                      rules={[{ required: true, message: 'Enter tracking ID' }]}
                    >
                      <Input placeholder="Enter AWB / Tracking ID" />
                    </Form.Item>
                  </>
                )}

                <Button type="primary" htmlType="submit">
                  Confirm and Ship Order
                </Button>
              </Form>
            </Card>
          )}
        </Col>
{/* 
        <Col span={12}>
          {order.items?.length > 0 && (
            <Tabs defaultActiveKey="0" tabPosition="top" type="line">
              {order.items.map((item, index) => {
                const product = item.product;
                const variation = product?.variations?.[0] || {};

                return (
                  <TabPane tab={product?.name} key={index}>
                    <Card>
                      <Row gutter={24}>
                        <Col span={10}>
                          <Title level={5}>Media</Title>
                          <Row gutter={[8, 8]}>
                            {product.images.map((url, i) => (
                              <Col span={24} key={i}>
                                <Image width="80%" src={url} />
                              </Col>
                            ))}
                          </Row>
                        </Col>
                        <Col span={14}>
                          <Descriptions column={1}>
                            <Descriptions.Item label="SKU">{variation.sku}</Descriptions.Item>
                            <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                            <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
                            <Descriptions.Item label="Price">₹{item.priceAtPurchase}</Descriptions.Item>
                            <Descriptions.Item label="Discount">{variation.discount || 0}%</Descriptions.Item>
                            <Descriptions.Item label="Quantity">{item.quantity}</Descriptions.Item>
                            <Descriptions.Item label="In Stock">
                              {variation.stock > 0 ? (
                                <Tag color="green">Yes</Tag>
                              ) : (
                                <Tag color="red">No</Tag>
                              )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Expiry Date">
                              {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}
                            </Descriptions.Item>
                          </Descriptions>

                          <Divider />

                          <Title level={5}>Description</Title>
                          <Text>{product.description}</Text>

                          <Divider />

                          <Title level={5}>Trademark</Title>
                          <Text strong>Brand Name:</Text> <Text>{product.tmBrandName || 'N/A'}</Text> <br />
                          <Text strong>TM Ref No:</Text> <Text>{product.tmReferenceNo || 'N/A'}</Text>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                );
              })}
            </Tabs>
          )}
        </Col> */}
      </Row>
    </div>
  );
};

export default OrderDetail;
