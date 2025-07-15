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
  Breadcrumb,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
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
    mrp: 3999,
    priority: 1,
    variations: [{ type: 'Color', value: 'Black' }],
    mediaItems: [{ file: 'headphones.jpg', priority: 1 }],
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
    mrp: 4999,
    priority: 2,
    variations: [{ type: 'Size', value: '10' }],
    mediaItems: [{ file: 'shoes.jpg', priority: 1 }],
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
    console.log('✅ Updated Product:', values);
    message.success('Product updated successfully!');
  };

  if (!product) return null;

  const breadcrumbItems = [
    {
      title: <Link to="/product">Products</Link>,
    },
    {
      title: 'Edit Product',
    },
  ];

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />

      <Card title={`Edit Product: ${product.title}`}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Product Info */}
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
            <Col span={6}>
              <Form.Item label="Price (₹)" name="price" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="MRP (₹)" name="mrp" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Discount (%)" name="discount">
                <InputNumber style={{ width: '100%' }} min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={6}>
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

          {/* Product Display Priority */}
          <Form.Item label="Product Display Priority" name="priority">
            <InputNumber min={1} max={100} placeholder="Lower = Higher Priority" style={{ width: 200 }} />
          </Form.Item>

          {/* Product Variations */}
          <Card type="inner" title="Product Variations" style={{ marginTop: 20 }}>
            <Form.List name="variations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          rules={[{ required: true, message: 'Enter variation type' }]}
                        >
                          <Input placeholder="Type (e.g., Size, Color)" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Enter variation value' }]}
                        >
                          <Input placeholder="Value (e.g., Medium, Red)" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button onClick={() => add()}>Add Variation</Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>

          {/* Media Upload with Priority */}
          <Card type="inner" title="Media Upload (Images & Videos)" style={{ marginTop: 20 }}>
            <Form.List name="mediaItems">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, 'file']}
                          rules={[{ required: true, message: 'Please upload a media file' }]}
                        >
                          <Upload beforeUpload={() => false} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'priority']}
                          rules={[{ required: true, message: 'Set priority' }]}
                        >
                          <InputNumber min={1} max={10} placeholder="Priority (1=High)" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <Button onClick={() => add()} icon={<UploadOutlined />}>
                      Add Media
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
