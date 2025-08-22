// components/AddTicketModal.jsx
import React from 'react';
import { Modal } from 'antd';
import axios from 'axios';

const AddTicketModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  modalValue,
  setModalValue
}) => {

  const handleOnChange = (field, value) => {
    setModalValue(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('File uploaded successfully');
      setModalValue(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), res.data.fileUrl]
      }));
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const removeAttachment = (urlToRemove) => {
    setModalValue(prev => ({
      ...prev,
      attachments: prev.attachments.filter(url => url !== urlToRemove)
    }));
  };

  return (
    <Modal
      title="Add Support Ticket"
      open={open}
      onOk={onSubmit}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <input
        type="text"
        placeholder="Enter Subject"
        onChange={(e) => handleOnChange("subject", e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="text"
        placeholder="Enter Description"
        onChange={(e) => handleOnChange("description", e.target.value)}
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'block', marginBottom: 10 }}
      />

      {/* Attachment Preview */}
      {modalValue.attachments.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <p>Attachments:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {modalValue.attachments.map((url, index) => (
              <div key={index} style={{ position: 'relative', width: 100 }}>
                {url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                  <img
                    src={url}
                    alt="preview"
                    style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 4 }}
                  />
                ) : (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <div style={{
                      width: 100,
                      height: 100,
                      background: '#eee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4
                    }}>
                      File
                    </div>
                  </a>
                )}
                <button
                  onClick={() => removeAttachment(url)}
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    background: 'red',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AddTicketModal;
