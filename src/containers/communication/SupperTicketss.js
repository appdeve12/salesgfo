
import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Table, Tag, } from 'antd';
import axios from 'axios';
import { sellerallticket, supportTicket } from '../../services/allService';
import AddTicketModal from './AddTicketModal';
import { BASE_URL } from '../../services/apiRoutes';

const SupperTicketss = () => {
  const { Option } = Select;
  const [ticketModel, setTicketModel] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalValue, setModalValue] = useState({ attachments: [] });
  const [tickets, setTickets] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  console.log(statusFilter)

  const handleSubmit = async () => {
    setConfirmLoading(true);
    try {
      const response = await supportTicket(modalValue);
      if (response.status === 201) {
        setTicketModel(false);
        fetchAllTickets();
        setModalValue({ attachments: [] });
      }
    } catch (error) {
      console.error("Error submitting ticket", error);
    } finally {
      setConfirmLoading(false);
    }
  };


  const addTicket = () => setTicketModel(true);



  const handleCancel = () => {
    setTicketModel(false);
    setModalValue({ attachments: [] });
  };

  // ✅ Fetch All Tickets
  const fetchAllTickets = async () => {
    try {
      const response = await sellerallticket();
      parseTicketData(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  // ✅ Parse Ticket Data for Table
  const parseTicketData = (data) => {
    const parsed = data.map((item, index) => ({
      key: index + 1,
      id: item.ticketId,
      subject: item.subject,
      description: item.description,
      attachments: item.attachments,
      priority: item.priority,
      status: item.status,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
    }));
    setTickets(parsed);
    setFilteredData(parsed)
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);
  const openViewModal = (ticket) => {
    setSelectedTicket(ticket);
    setViewModalOpen(true);
  };

  const handleReplySubmit = async () => {
    try {
      await axios.post(`/api/support/tickets/reply/${selectedTicket.id}`, {
        message: replyMessage,
        attachments: []  // Add attachment handling if needed
      });
      fetchAllTickets();
      setReplyMessage('');
      setViewModalOpen(false);
    } catch (err) {
      console.error('Reply failed', err);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axios.post(`/api/support/tickets/feedback/${selectedTicket.id}`, {
        message: feedbackMessage
      });
      fetchAllTickets();
      setFeedbackMessage('');
      setViewModalOpen(false);
    } catch (err) {
      console.error('Feedback failed', err);
    }
  };


  // ✅ Table Column


  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },           
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={
          status === 'open' ? 'red' :
            status === 'resolved' ? 'green' :
              'blue'
        }>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: priority => (
        <Tag color={
          priority === 'high' ? 'volcano' :
            priority === 'medium' ? 'gold' :
              'geekblue'
        }>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Attachment',
      dataIndex: 'attachments',
      key: 'attachments',
      render: (attachments) => {
        if (!attachments || attachments.length === 0) return 'No File';

        return (
          <div style={{ display: 'flex', gap: 8 }}>
            {attachments.map((url, idx) => {
              const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
              return isImage ? (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${BASE_URL}${url}`}
                    alt={`attachment-${idx}`}
                    style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                  />
                </a>
              ) : (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                  File {idx + 1}
                </a>
              );
            })}
          </div>
        );
      }

    },


    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => openViewModal(record)}>
          View
        </Button>
      ),
    },

  ];
  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setFilteredData(
      value === 'All' ? tickets : tickets.filter((t) => t.status == value)
    );
  };
  return (
    <div>
      <Button type="primary" onClick={addTicket}>Add Ticket</Button>
      <Select
        value={statusFilter}
        onChange={handleStatusChange}
        style={{ width: 180 }}
      >
        <Option value="All">All Statuses</Option>
        <Option value="open">Open</Option>
        <Option value="inprogress">In Progress</Option>
        <Option value="Resolved">Resolved</Option>
      </Select>

      {/* ✅ Modal */}
      <AddTicketModal
        open={ticketModel}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        confirmLoading={confirmLoading}
        modalValue={modalValue}
        setModalValue={setModalValue}
      />

      {/* ✅ Ticket Table */}
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
      <Modal
        title={`Ticket: ${selectedTicket?.id}`}
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
      >
        {selectedTicket && (
          <>
            <p><strong>Subject:</strong> {selectedTicket.subject}</p>
            <p><strong>Description:</strong> {selectedTicket.description}</p>
            <p><strong>Status:</strong> {selectedTicket.status}</p>

            <h4>Reply</h4>
            <textarea
              rows={4}
              style={{ width: '100%' }}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply..."
            />
            <Button type="primary" onClick={handleReplySubmit} style={{ marginTop: 10 }}>
              Send Reply
            </Button>

            {(selectedTicket.status === 'resolved' || selectedTicket.status === 'closed') && (
              <>
                <h4 style={{ marginTop: 20 }}>Feedback</h4>
                <textarea
                  rows={3}
                  style={{ width: '100%' }}
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Leave your feedback..."
                />
                <Button type="primary" onClick={handleFeedbackSubmit} style={{ marginTop: 10 }}>
                  Submit Feedback
                </Button>
              </>
            )}
          </>
        )}
      </Modal>

    </div>
  );
};

export default SupperTicketss;


