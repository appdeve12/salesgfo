import React from 'react';
import { useLocation, useParams, useNavigate,Link } from 'react-router-dom';
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
  Breadcrumb
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const OrderDetail = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) return <p>Order not found.</p>;

  return (
    <div>
               <Breadcrumb style={{ marginBottom: 16 }}>
    
      <Breadcrumb.Item>
        <Link to="/order">Orders</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Order Details - ${order.orderId}</Breadcrumb.Item>
    </Breadcrumb> 
    <Row gutter={12}>
      <Col span={12}><Card    className='custum-pedding'       bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Customer">{order.customer}</Descriptions.Item>
          <Descriptions.Item label="Order Date">{order.date}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={order.status === 'Pending' ? 'orange' : order.status === 'Shipped' ? 'green' : 'red'}>
              {order.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Address">{order.address}</Descriptions.Item>
          <Descriptions.Item label="Items">{order.items}</Descriptions.Item>
          <Descriptions.Item label="Tracking ID">{order.tracking || 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card></Col>
       <Col span={12}>    {order.products?.length > 0 && (
        <>
       

          <Tabs defaultActiveKey="0" tabPosition="top" type="line">
            {order.products.map((product, index) => (
              <TabPane tab={product.title} key={index}>
                <Card>
                  <Row gutter={24}>
                    {/* Media */}
                    <Col span={10}>
                      <Title level={5}>Media</Title>
                      <Row gutter={[8, 8]}>
                        {product.media.map((file, i) =>
                          file.type === 'image' ? (
                            <Col span={24} key={i}>
                              <Image width="50%" src={file.url} />
                            </Col>
                          ) : (
                            <Col span={24} key={i}>
                              <video width="50%" controls>
                                <source src={file.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </Col>
                          )
                        )}
                      </Row>
                    </Col>

                    {/* Info */}
                    <Col span={14}>
                      <Descriptions bordered column={1} labelStyle={{ fontWeight: 600 }}>
                        <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
                        <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
                        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
                        <Descriptions.Item label="Price">₹{product.price}</Descriptions.Item>
                        <Descriptions.Item label="Discount">{product.discount}%</Descriptions.Item>
                        <Descriptions.Item label="Quantity">{product.quantity}</Descriptions.Item>
                        <Descriptions.Item label="In Stock">
                          {product.inStock ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Handling Time">{product.handlingtime}</Descriptions.Item>
                        <Descriptions.Item label="Restock Date">{product.restockdate}</Descriptions.Item>
                      </Descriptions>

                      <Divider />

                      <Title level={5}>Description</Title>
                      <Text>{product.description}</Text>

                      <Divider />

                      <Title level={5}>Trademark</Title>
                      <Text strong>Brand Name:</Text> <Text>{product.tmBrandName}</Text> <br />
                      <Text strong>TM Ref No:</Text> <Text>{product.tmReferenceNo}</Text>
                    </Col>
                  </Row>
                </Card>
              </TabPane>
            ))}
          </Tabs>
        </>
      )}</Col>
    </Row>

      {/* Order Info */}
      {/* <Card    className='custum-pedding'       bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Customer">{order.customer}</Descriptions.Item>
          <Descriptions.Item label="Order Date">{order.date}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={order.status === 'Pending' ? 'orange' : order.status === 'Shipped' ? 'green' : 'red'}>
              {order.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Shipping Address">{order.address}</Descriptions.Item>
          <Descriptions.Item label="Items">{order.items}</Descriptions.Item>
          <Descriptions.Item label="Tracking ID">{order.tracking || 'N/A'}</Descriptions.Item>
        </Descriptions>
      </Card> */}

 

      {/* Product Tabs */}
    
    </div>
  );
};

export default OrderDetail;
