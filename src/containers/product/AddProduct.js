import React from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Card,
  Upload,
  Switch,
  Row,
  Col,
  message,
  DatePicker,
  Breadcrumb,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('🟢 Final Product Data:', values);
    message.success('Product submitted!');
  };

  const breadcrumbItems = [
    {
      title: <Link to="/product">Products</Link>,
    },
    {
      title: 'Add Product',
    },
  ];

  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />

      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            price: 0,
            quantity: 1,
            inStock: true,
            discount: 0,
          }}
        >
          {/* Basic Info */}
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input placeholder="Product Title" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
                <Input placeholder="Stock Keeping Unit" />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="Handling Time" name="handlingtime" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="InStock Quantity" name="instockquantity" rules={[{ required: true }]}>
                <Input placeholder="InStock Quantity" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <TextArea rows={3} placeholder="Product Description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} prefix="₹" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="MRP" name="mrp" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} prefix="₹" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Discount (%)" name="discount">
                <InputNumber min={0} max={100} style={{ width: '100%' }} suffix="%" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Select placeholder="Select Category">
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
                <Input placeholder="Brand Name" />
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

          {/* Media Uploads with Priority */}
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
            <Button className="custumcss textwhite" htmlType="submit">
              Save Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
