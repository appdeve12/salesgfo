// pages/compliance/RefundPolicy.js
import { Card, Typography, Form, Input, Button } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const RefundPolicy = () => (
  <Card>
    <Title level={4}>Refund & Exchange Policy</Title>
    <Form layout="vertical">
      <Form.Item label="Refund Eligibility Criteria" name="refundEligibility">
        <TextArea rows={4} placeholder="Specify conditions under which refund is eligible..." />
      </Form.Item>
      <Form.Item label="Exchange Conditions" name="exchangePolicy">
        <TextArea rows={4} placeholder="Specify your exchange policy..." />
      </Form.Item>
      <Form.Item label="Refund Timeline" name="timeline">
        <Input placeholder="e.g., 5-7 working days" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Save Policy</Button>
      </Form.Item>
    </Form>
  </Card>
);

export default RefundPolicy;
