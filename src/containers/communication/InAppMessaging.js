import React, { useRef, useState, useEffect } from 'react';
import { Card, Typography, Input, Button, List, Select, Avatar } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const dummyConversations = {
  Buyer1: [
    { sender: 'Buyer1', text: 'Is this item available in blue?', time: '2 hours ago' },
    { sender: 'You', text: 'Yes, it is available in all colors.', time: '1 hour ago' },
  ],
  Buyer2: [
    { sender: 'Buyer2', text: 'When will my order arrive?', time: '1 day ago' },
  ],
};

const InAppMessaging = () => {
  const [buyer, setBuyer] = useState('Buyer1');
  const [messageList, setMessageList] = useState(dummyConversations[buyer] || []);
  const [newMsg, setNewMsg] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    setMessageList(dummyConversations[buyer] || []);
  }, [buyer]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!newMsg.trim()) return;

    const newMessage = {
      sender: 'You',
      text: newMsg.trim(),
      time: 'Just now',
    };

    setMessageList((prev) => [...prev, newMessage]);
    setNewMsg('');
  };

  return (
    <Card>
      <Title level={4}>In-App Messaging</Title>

      {/* Buyer Selection */}
      <Select
        value={buyer}
        onChange={setBuyer}
        style={{ width: 220, marginBottom: 20 }}
        placeholder="Select Buyer"
      >
        {Object.keys(dummyConversations).map((buyer) => (
          <Select.Option key={buyer} value={buyer}>
            {buyer}
          </Select.Option>
        ))}
      </Select>

      {/* Chat List */}
      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 20, padding: '0 8px' }}>
        <List
          dataSource={messageList}
          renderItem={(msg) => (
            <List.Item
              style={{
                justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                textAlign: msg.sender === 'You' ? 'right' : 'left',
              }}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={
                  <span style={{ fontWeight: 'bold' }}>
                    {msg.sender}{' '}
                    <span style={{ fontWeight: 'normal', color: '#999', fontSize: 12 }}>
                      • {msg.time}
                    </span>
                  </span>
                }
                description={
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: 12,
                      backgroundColor: msg.sender === 'You' ? '#e6f7ff' : '#f5f5f5',
                      maxWidth: 300,
                      wordWrap: 'break-word',
                    }}
                  >
                    {msg.text}
                  </span>
                }
              />
            </List.Item>
          )}
        />
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <TextArea
        rows={2}
        placeholder="Type your message..."
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={handleSend}
        style={{ marginTop: 10 }}
      >
        Send
      </Button>
    </Card>
  );
};

export default InAppMessaging;
