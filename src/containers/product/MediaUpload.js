import React, { useState } from 'react';
import axios from 'axios';

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview file
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully: ' + res.data.fileUrl);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*,video/*" />
      {previewUrl && (
        <>
          {file.type.startsWith('image') ? (
            <img src={previewUrl} alt="preview" style={{ width: 300 }} />
          ) : (
            <video src={previewUrl} controls width={300} />
          )}
        </>
      )}
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default MediaUpload;
