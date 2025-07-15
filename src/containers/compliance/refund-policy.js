// pages/compliance/RefundPolicy.js
import { Card, Typography, Form, Input, Button, message } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const RefundPolicy = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Simulate saving data (replace with API call)
        console.log('Saved Refund Policy:', values);
        message.success('Refund & Exchange Policy saved successfully!');
        // Optional: reset form or update state
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Card>
      <Title level={4}>Refund & Exchange Policy</Title>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Refund Eligibility Criteria"
          name="refundEligibility"
          rules={[{ required: true, message: 'Please enter refund eligibility criteria.' }]}
        >
          <TextArea
            rows={4}
            placeholder="Specify conditions under which refund is eligible..."
          />
        </Form.Item>

        <Form.Item
          label="Exchange Conditions"
          name="exchangePolicy"
          rules={[{ required: true, message: 'Please enter exchange policy.' }]}
        >
          <TextArea rows={4} placeholder="Specify your exchange policy..." />
        </Form.Item>

        <Form.Item
          label="Refund Timeline"
          name="timeline"
          rules={[{ required: true, message: 'Please specify refund timeline.' }]}
        >
          <Input placeholder="e.g., 5-7 working days" />
        </Form.Item>

        <Form.Item>
          <Button className='custumcss textwhite' onClick={handleSave}>
            Save Policy
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RefundPolicy;
