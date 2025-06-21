import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Switch, Tag } from 'antd';

const { Option } = Select;

const UserAccess = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // fetch users for current business
    setUsers([
      {
        id: '1',
        name: 'Ravi Kumar',
        email: 'ravi@example.com',
        role: 'employee',
        permissions: ['viewOrders', 'editProducts'],
        status: 'active',
      }
    ]);
  }, []);

  const showModal = () => setIsModalOpen(true);

  const handleFinish = (values) => {
    console.log('New User:', values);
    // POST to API
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role', render: r => <Tag color="blue">{r}</Tag> },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      render: (perms) => perms.map(p => <Tag key={p}>{p}</Tag>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (s) => <Tag color={s === 'active' ? 'green' : 'red'}>{s}</Tag>
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>Add Sub-User</Button>

      <Table columns={columns} dataSource={users} rowKey="id" style={{ marginTop: 20 }} />

      <Modal
        title="Add New Sub-User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Role" name="role" initialValue="employee">
            <Select>
              <Option value="employee">Employee</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Permissions" name="permissions">
            <Select mode="multiple" allowClear placeholder="Select permissions">
              <Option value="viewOrders">View Orders</Option>
              <Option value="editProducts">Edit Products</Option>
              <Option value="accessPayouts">Access Payouts</Option>
              <Option value="manageUsers">Manage Users</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Enable Access" name="status" valuePropName="checked" initialValue={true}>
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserAccess;
