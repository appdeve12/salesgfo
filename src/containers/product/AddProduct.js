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
  DatePicker
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('🟢 Final Product Data:', values);
    message.success('Product submitted!');
  };
 
  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }}>
    
      <Breadcrumb.Item>
        <Link to="/product">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Add Product</Breadcrumb.Item>
    </Breadcrumb>

    <Card >
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
            <Form.Item label="Restock Date" name="restockdate" rules={[{ required: true }]}>
          <DatePicker />
            </Form.Item>
            
                      </Col>
        </Row>

        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <TextArea rows={3} placeholder="Product Description" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} prefix="₹" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Discount (%)" name="discount">
              <InputNumber min={0} max={100} style={{ width: '100%' }} suffix="%" />
            </Form.Item>
          </Col>

          <Col span={8}>
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

        {/* Trademark Verification */}
        <Card type="inner" title="Trademark Verification">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Brand Name (Trademark)" name="tmBrandName">
                <Input placeholder="Trademark Brand Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="TM Reference Number" name="tmReferenceNo">
                <Input placeholder="e.g. TM12345678" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Image Upload */}
        <Card type="inner" title="Media Upload (Images & Videos)" style={{ marginTop: 20 }}>
          <Form.Item label="Upload Product Media" name="media">
            <Upload
              listType="picture"
              maxCount={5}
              multiple
              beforeUpload={() => false} // prevent auto-upload
            >
              <Button icon={<UploadOutlined />}>Upload (Images/Videos)</Button>
            </Upload>
          </Form.Item>
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
