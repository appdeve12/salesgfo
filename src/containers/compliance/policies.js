import { useState } from 'react';
import { Card, Typography, Form, Input, Button, Select, message } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const categories = ['Electronics', 'Clothing', 'Books', 'Home Decor'];

const BusinessPolicies = () => {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    form.resetFields(['shipping', 'returnDays', 'cancellation']);
  };

  const handleSubmit = (values) => {
    // TODO: Submit policies category-wise to backend
    console.log('Saved Policy:', values);
    message.success(`Policies saved for category: ${values.category}`);
  };

  return (
    <Card>
      <Title level={4}>Business Policy Settings (Category-wise)</Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
            placeholder="Select a product category"
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <Select.Option key={cat} value={cat}>{cat}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        {selectedCategory && (
          <>
            <Form.Item
              label="Shipping Policy"
              name="shipping"
              rules={[{ required: true, message: 'Please enter shipping policy' }]}
            >
              <TextArea rows={4} placeholder="Describe your shipping policy..." />
            </Form.Item>

            <Form.Item
              label="Return Window (in days)"
              name="returnDays"
              rules={[{ required: true, message: 'Please select return window' }]}
            >
              <Select style={{ width: 200 }} placeholder="Select return window">
                {[7, 10, 15, 30].map((day) => (
                  <Select.Option key={day} value={day}>{day} Days</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Cancellation Policy"
              name="cancellation"
              rules={[{ required: true, message: 'Please enter cancellation policy' }]}
            >
              <TextArea rows={3} placeholder="When can orders be canceled?" />
            </Form.Item>

            <Form.Item>
              <Button className='custumcss textwhite' htmlType="submit">
                Save Policies
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </Card>
  );
};

export default BusinessPolicies;
