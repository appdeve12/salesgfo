// pages/compliance/BusinessPolicies.js
import { Card, Typography, Form, Input, Button, Select } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const BusinessPolicies = () => (
  <Card>
    <Title level={4}>Business Policy Settings</Title>
    <Form layout="vertical">
      <Form.Item label="Shipping Policy" name="shipping">
        <TextArea rows={4} placeholder="Describe your shipping policy..." />
      </Form.Item>
      <Form.Item label="Return Window (in days)" name="returnDays">
        <Select style={{ width: 200 }}>
          {[7, 10, 15, 30].map(day => (
            <Select.Option key={day} value={day}>{day} Days</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Cancellation Policy" name="cancellation">
        <TextArea rows={3} placeholder="When can orders be canceled?" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Save Policies</Button>
      </Form.Item>
    </Form>
  </Card>
);

export default BusinessPolicies;
