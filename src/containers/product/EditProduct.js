import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Card,
  Switch,
  Row,
  Col,
  Upload,
  message,
} from 'antd';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const mockProducts = [
  {
    id: '1',
    title: 'Wireless Headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 2999,
    quantity: 25,
    inStock: true,
    sku: 'SONY123',
    discount: 10,
    description: 'High quality wireless headphones',
    tmBrandName: 'Sony Corp',
    tmReferenceNo: 'TM123456',
  },
  {
    id: '2',
    title: 'Running Shoes',
    brand: 'Nike',
    category: 'clothing',
    price: 4500,
    quantity: 0,
    inStock: false,
    sku: 'NIKE567',
    discount: 5,
    description: 'Comfortable running shoes',
    tmBrandName: 'Nike Inc',
    tmReferenceNo: 'TM654321',
  },
];

const EditProduct = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = mockProducts.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      form.setFieldsValue(found);
    } else {
      message.error('Product not found');
    }
  }, [id, form]);

  const onFinish = (values) => {
    console.log('Updated Product:', values);
    message.success('Product updated successfully!');
  };

  if (!product) return null;

  return (
    <>
          <Breadcrumb style={{ marginBottom: 16 }}>
    
      <Breadcrumb.Item>
        <Link to="/product">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
    </Breadcrumb>
    <Card title={` ${product.title}`}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Price (₹)" name="price" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Discount (%)" name="discount">
              <InputNumber style={{ width: '100%' }} min={0} max={100} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Category" name="category" rules={[{ required: true }]}>
              <Select>
                <Option value="electronics">Electronics</Option>
                <Option value="clothing">Clothing</Option>
                <Option value="home">Home</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="In Stock" name="inStock" valuePropName="checked">
          <Switch />
        </Form.Item>

        {/* Trademark */}
        <Card type="inner" title="Trademark Verification">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="TM Brand Name" name="tmBrandName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="TM Reference No" name="tmReferenceNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Upload */}
        <Card type="inner" title="Media Upload" style={{ marginTop: 20 }}>
          <Form.Item name="media" label="Images / Videos">
            <Upload
              listType="picture"
              maxCount={5}
              multiple
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Files</Button>
            </Upload>
          </Form.Item>
        </Card>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </>
  );
};

export default EditProduct;
