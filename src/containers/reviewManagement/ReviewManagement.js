// import React, { useEffect, useState } from 'react';
// import { Table, Card, Tag, Button, Space, message, Popconfirm } from 'antd';
// import { WarningOutlined } from '@ant-design/icons';
// import { allreviews } from '../../services/allService';

// // 🔍 Sample review data


// // ⭐ Rating stars renderer
// const renderStars = (count) => '⭐'.repeat(count) + '☆'.repeat(5 - count);

// const ReviewManagement = () => {
//   const [review,setreview]=useState([])
//   const handleReport = (review) => {
//     // Here you'd trigger API call to support system
//     message.warning(`Reported review by ${review.customer} to support team.`);
//   };

//   const columns = [
//     {
//       title: 'Order ID',
//       dataIndex: 'orderId',
//     },
//     {
//       title: 'Product',
//       dataIndex: 'product',
//     },
//     {
//       title: 'Rating',
//       dataIndex: 'rating',
//       render: (rating) => <span>{renderStars(rating)}</span>,
//     },
//     {
//       title: 'Review',
//       dataIndex: 'comment',
//     },
//     {
//       title: 'Customer',
//       dataIndex: 'customer',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: (status) =>
//         status === 'published' ? (
//           <Tag color="green">Published</Tag>
//         ) : (
//           <Tag color="orange">Pending</Tag>
//         ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space direction="vertical">
//           <Popconfirm
//             title="Are you sure you want to report this review to support?"
//             onConfirm={() => handleReport(record)}
//           >
//             <Button danger icon={<WarningOutlined />} size="small">
//               Report to Support
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];
//   const fetchallrevbiew=async()=>{
//   try{
//     const response=await allreviews();
//     if(response.status==200){
// setreview(response.data)
//     }

//   }catch(err){

//   }
// }
// useEffect(()=>{
//   fetchallrevbiew()
//   },[])


//   return (
//     <div>
//       <h2>Review & Rating Management</h2>
//       <Card title="Customer Reviews & Feedback" variant={false}>
//         <Table
//           dataSource={reviewsData}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default ReviewManagement;
import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Tag,
  Button,
  Space,
  message,
  Modal,
  Input,
} from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { allreviews, reportReview } from '../../services/allService'; // API services

const ReviewManagement = () => {
  const [review, setReview] = useState([]);

  const fetchAllReviews = async () => {
    try {
      const response = await allreviews();
      if (response.status === 200) {
        const formattedData = response.data.reviews.map((review, index) => ({
          key: index,
          reviewId: review._id,
          orderId: review.order?.orderId || 'N/A',
          product: review.product?.name || 'N/A',
          rating: review.rating,
          comment: review.review || '',
          customer: review.buyer?.fullName || 'N/A',
          status: review.moderation?.status || 'pending',
          raw: review,
        }));
        setReview(formattedData);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      message.error('Failed to load reviews.');
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleReport = (record) => {
    Modal.confirm({
      title: `Report review by ${record.customer}?`,
      content: (
        <>
          <p>Enter reason for reporting:</p>
          <Input.TextArea
            id="reportReasonInput"
            rows={3}
            placeholder="E.g. fake review, abusive language..."
          />
        </>
      ),
      onOk: async () => {
        const reason = document.getElementById('reportReasonInput').value.trim();
        if (!reason) {
          message.warning('Please provide a reason.');
          return Promise.reject(); // prevent closing modal
        }

        try {
          await reportReview(record.reviewId, reason);
          message.success('Review reported successfully.');
          fetchAllReviews(); // Refresh the table
        } catch (error) {
          console.error('Error reporting review:', error);
          message.error('Failed to report review.');
        }
      },
    });
  };

  const renderStars = (rating) => {
    const fullStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(5 - rating);
    return (
      <span style={{ color: '#faad14', fontSize: '16px' }}>
        {fullStars}
        {emptyStars}
      </span>
    );
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      render: renderStars,
    },
    {
      title: 'Review',
      dataIndex: 'comment',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) =>
        status === 'published' ? (
          <Tag color="green">Published</Tag>
        ) : status === 'reported' ? (
          <Tag color="red">Reported</Tag>
        ) : (
          <Tag color="orange">{status}</Tag>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space direction="vertical">
          {record.status === 'pending' && (
            <Button
              danger
              icon={<WarningOutlined />}
              size="small"
              onClick={() => handleReport(record)}
            >
              Report to Support
            </Button>
          )}
          {record.status === 'reported' && (
            <Tag color="red">Already Reported</Tag>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Review & Rating Management</h2>
      <Card title="Customer Reviews & Feedback" bordered={false}>
        <Table
          dataSource={review}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ReviewManagement;
