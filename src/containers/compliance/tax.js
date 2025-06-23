// pages/compliance/TaxCompliance.js
import { Card, Typography, Form, Input, Button } from 'antd';

const { Title, Paragraph } = Typography;

const TaxCompliance = () => (
  <Card>
    <Title level={4}>Tax Compliance Settings</Title>
    <Paragraph>
      Ensure your PAN and tax details are correctly linked for income tax compliance and TDS reporting.
    </Paragraph>
    <Form layout="vertical">
      <Form.Item label="PAN Number" name="pan" rules={[{ required: true }]}>
        <Input style={{ maxWidth: 400 }} />
      </Form.Item>
      <Form.Item label="GSTIN" name="gstin">
        <Input style={{ maxWidth: 400 }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Save Tax Details</Button>
      </Form.Item>
    </Form>
  </Card>
);

export default TaxCompliance;
