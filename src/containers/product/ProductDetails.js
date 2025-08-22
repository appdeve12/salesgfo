import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Card, Row, Col, Typography, Divider, Tag, Image, Descriptions, Spin, message, Breadcrumb, Table
} from 'antd';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'antd';
import dayjs from 'dayjs';
import { fetchparticularsellerproduct } from '../../services/allService';

const { Title, Text } = Typography;

const ProductDetails = () => {
  const particularproduct = useSelector(state => state?.product?.particularproduct)
  console.log("particularproduct", particularproduct)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchparticularsellerproduct(id);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spin fullscreen tip="Loading product..." size="large" />;

  const breadcrumbItems = [
    { title: <Link to="/product">Products</Link> },
    { title: <span>{product.name}</span> },
  ];

  const hasVariations = product.variations && product.variations.length > 0;

  // Table columns for variations
  const variationColumns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />
      <Card>
        <Row gutter={24}>
          {/* Media Section */}
          <Col span={10}>
            <Title level={4}>Media</Title>
            <Carousel autoplay dots>
              {product.images.map((url, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <Image
                    width="100%" height="300"
                    src={url}
                    alt={`product-img-${i}`}
                    style={{ objectFit: 'contain', margin: '0 auto' }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          {/* Product Info */}
          <Col span={14}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Brand">{product.brand}</Descriptions.Item>
              <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
              <Descriptions.Item label="Product Type">{product.productType}</Descriptions.Item>
              <Descriptions.Item label="Approved">
                {product.isApproved ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
              </Descriptions.Item>
              <Descriptions.Item label="Certification">{product.certification}</Descriptions.Item>
              <Descriptions.Item label="Expiry Date">
                {product.expiryDate ? dayjs(product.expiryDate).format('MMMM D, YYYY') : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Maintenance Interval">{product.maintenanceInterval}</Descriptions.Item>
              <Descriptions.Item label="Created At">{dayjs(product.createdAt).format('MMMM D, YYYY')}</Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Render variation table or single product info */}
            {hasVariations ? (
              <>
                <Title level={5}>Product Variations</Title>
                <Table
                  dataSource={product.variations}
                  columns={variationColumns}
                  rowKey="_id"
                  pagination={false}
                  size="small"
                />
              </>
            ) : (
              <>
                <Title level={5}>Product Details</Title>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="SKU">{product.sku}</Descriptions.Item>
                  <Descriptions.Item label="Price">₹{product.price}</Descriptions.Item>
                  <Descriptions.Item label="Discount">{product.discount}%</Descriptions.Item>
                  <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
                </Descriptions>
              </>
            )}

            <Divider />

            <Title level={5}>Description</Title>
            <Text>{product.description}</Text>

            <Divider />

            <Title level={5}>Package Contents</Title>
            <Text>{product.packageContents}</Text>

            <Divider />

            <Title level={5}>Usage Class</Title>
            {product.usageClass?.map((cls, index) => (
              <Tag color="blue" key={index}>{cls}</Tag>
            ))}

            <Divider />

            <Title level={5}>Compliance Documents</Title>
            {product.complianceDocuments?.map((doc, i) => (
              <p key={i}><a href={doc} target="_blank" rel="noreferrer">Document {i + 1}</a></p>
            ))}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ProductDetails;
