import React, { useEffect, useState } from 'react';
import {
  Card, Row, Col, Typography, Divider, Tag, Image, Descriptions, Button, Spin, message,Breadcrumb
} from 'antd';
import { PlayCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { Carousel } from 'antd';
const { Title, Text } = Typography;

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 🔵 Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock fetch (Replace with real API call)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 🟠 Replace this with actual API call like:
        // const res = await axios.get(`/api/products/${id}`);
        // setProduct(res.data);

        // Demo data for now
        const mockData =
         {
          _id: id,
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
        };
        setTimeout(() => {
          setProduct(mockData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        message.error('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spin fullscreen tip="Loading product..." size="large"/>;

  return (
    <>
       <Breadcrumb style={{ marginBottom: 16 }}>
    
      <Breadcrumb.Item>
        <Link to="/product">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item> <span>{product.title}</span></Breadcrumb.Item>
    </Breadcrumb>  
    <Card
      // title={
      //   <>
      //     <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/product')} style={{ marginRight: 10 }} />
      //     <span>{product.title}</span>
      //   </>
      // }
    >
      <Row gutter={24}>
        {/* Media */}
       <Col span={10}>
  <Title level={4}>Media</Title>
  <Carousel autoplay dots>
    {product.media.map((file, i) => (
      <div key={i} style={{ textAlign: 'center' }}>
        {file.type === 'image' ? (
          <Image
          width="100%" height="300"
            src={file.url}
            alt={`media-${i}`}
            style={{objectFit: 'contain', margin: '0 auto' }}
          />
        ) : (
          <video width="100%" height="300" controls>
            <source src={file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    ))}
  </Carousel>
</Col>


        {/* Product Info */}
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
    </>
  );
};

export default ProductDetails;
