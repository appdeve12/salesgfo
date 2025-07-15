import React, { useRef, useState, useEffect } from 'react';
import { Card, Typography, Input, Button, List, Select, Avatar, Row, Col } from 'antd';
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
    <Card
      style={{

        margin: 'auto',

      }}
      bodyStyle={{ padding: 24 }}
    >
      <Title level={4}>💬 In-App Messaging</Title>

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
      <div
        style={{
          maxHeight: 350,
          overflowY: 'auto',
          marginBottom: 20,
          padding: '0 8px',
          background: '#fafafa',
          borderRadius: 8,
        }}
      >
        <List
          dataSource={messageList}
          renderItem={(msg) => (
            <List.Item
              style={{
                justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                textAlign: msg.sender === 'You' ? 'right' : 'left',
                padding: '8px 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row' }}>
                {msg.sender !== 'You' && (
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ marginRight: 8 }}
                  />
                )}
                <div>
                  <div
                    className="custumcss textwhite"
                    style={{
                      padding: '10px 14px',
                      borderRadius: 16,
                      maxWidth: 300,
                      wordWrap: 'break-word',
                      fontSize: 14,
                    }}
                  >
                    {msg.text}
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 4 }}>
                    {msg.sender} • {msg.time}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
        <div ref={messageEndRef} />
      </div>

      {/* Message Input & Send Button */}
      <Row gutter={8}>
        <Col flex="auto">
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
        </Col>
        <Col>
          <Button
            className="custumcss textwhite"
            icon={<SendOutlined />}
            onClick={handleSend}
            style={{ height: '100%' }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default InAppMessaging;
