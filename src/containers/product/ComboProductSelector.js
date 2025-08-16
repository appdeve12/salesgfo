// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, InputNumber, Select, Card, message, Upload, Row, Col } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { addcomboproduct, getallsellerproduct } from '../../services/allService';

// import { useSelector } from 'react-redux'

// const ComboProductSelector = () => {
//   const particularproduct = useSelector(state => state?.product?.particularproduct);
//   console.log("particularproduct",particularproduct)
//   useEffect(()=>{

//   },[particularproduct])
//     const [form] = Form.useForm();

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchAllProduct();
//   }, []);
//   const handleAddComboItem = () => {
//     setComboItems([...comboItems, { product: '', variationLabel: '', quantity: 1 }]);
//   };

//   const handleRemoveComboItem = (index) => {
//     const updated = [...comboItems];
//     updated.splice(index, 1);
//     setComboItems(updated);
//   };

//   const handleComboItemChange = (index, field, value) => {
//     const updated = [...comboItems];
//     updated[index][field] = value;
//     setComboItems(updated);
//   };

//   const handleUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('media', file);
//     try {
//       const res = await axios.post('http://localhost:5000/upload', formData);
//       setImageUrl(res.data.fileUrl);
//       message.success('Uploaded');
//     } catch {
//       message.error('Upload failed');
//     }
//     return false;
//   };

//   const onFinish = async (values) => {
//     const payload = {
//       ...values,
//       isCombo: true,
//       comboItems,
//       images: [imageUrl]
//     };

//     try {
//       const res = await addcomboproduct(payload)
//       if (res.status === 201) {
//         message.success('Combo product created!');
//         form.resetFields();
//         setComboItems([]);
//         setImageUrl(null);
//       }
//     } catch (err) {
//       message.error('Error: ' + err.response?.data?.error || 'Something went wrong');
//     }
//   };
//   useEffect(() => {
//     if (particularproduct) {
//       const transformed = {
//         ...particularproduct,
//         name: particularproduct.name, // map name to title
  
//       };
//       setProduct(transformed);
//       form.setFieldsValue(transformed);
//     } else {
//       message.error('Product not found');
//     }
//   }, [particularproduct, form]);
//   return (
//     <>
//         <Card title="Add Combo Product">
//           <Form layout="vertical" form={form} onFinish={onFinish}>
//             <Row gutter={16}>
//               <Col span={12}>
//                 <Form.Item label="Combo Name" name="name" rules={[{ required: true }]}>
//                   <Input placeholder="Combo Product Name" />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item label="MRP" name="mrp" rules={[{ required: true }]}>
//                   <InputNumber min={0} prefix="₹" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item label="Price" name="price" rules={[{ required: true }]}>
//                   <InputNumber min={0} prefix="₹" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item label="Discount (%)" name="discount">
//                   <InputNumber min={0} max={100} suffix="%" style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//               <Col span={6}>
//                 <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
//                   <InputNumber min={0} style={{ width: '100%' }} />
//                 </Form.Item>
//               </Col>
//             </Row>
    
//             {/* Combo Items Section */}
//             <Card type="inner" title="Combo Includes">
//               {comboItems.map((item, index) => (
//                 <Row gutter={16} key={index} style={{ marginBottom: 12 }}>
//                   <Col span={8}>
//                     <Select
//                       showSearch
//                       placeholder="Select Product"
//                       value={item.product}
//                       onChange={(val) => handleComboItemChange(index, 'product', val)}
//                       style={{ width: '100%' }}
//                     >
//                       {allProducts.map((p) => (
//                         <Option key={p._id} value={p._id}>{p.name}</Option>
//                       ))}
//                     </Select>
//                   </Col>
//                   <Col span={6}>
//                     <Input
//                       placeholder="Variation Label (optional)"
//                       value={item.variationLabel}
//                       onChange={(e) => handleComboItemChange(index, 'variationLabel', e.target.value)}
//                     />
//                   </Col>
//                   <Col span={4}>
//                     <InputNumber
//                       min={1}
//                       value={item.quantity}
//                       onChange={(val) => handleComboItemChange(index, 'quantity', val)}
//                       style={{ width: '100%' }}
//                     />
//                   </Col>
//                   <Col span={4}>
//                     <Button danger onClick={() => handleRemoveComboItem(index)}>Remove</Button>
//                   </Col>
//                 </Row>
//               ))}
//               <Button type="dashed" onClick={handleAddComboItem} icon={<PlusOutlined />}>
//                 Add Combo Item
//               </Button>
//             </Card>
    
//             {/* Image Upload */}
//             <Form.Item label="Upload Image" style={{ marginTop: 20 }}>
//               <Upload
//                 beforeUpload={handleUpload}
//                 showUploadList={false}
//                 accept="image/*"
//               >
//                 <Button icon={<PlusOutlined />}>Upload Image</Button>
//               </Upload>
//               {imageUrl && (
//                 <img src={imageUrl} alt="combo" style={{ width: 200, marginTop: 10, border: '1px solid #ccc' }} />
//               )}
//             </Form.Item>
    
//             {/* Submit */}
//             <Form.Item style={{ marginTop: 24 }}>
//               <Button type="primary" htmlType="submit" block>
//                 Submit Combo Product
//               </Button>
//             </Form.Item>
//           </Form>
//         </Card>
//         </>
//   )
// }

// export default ComboProductSelector
import React from 'react'

const ComboProductSelector = () => {
  return (
    <div>ComboProductSelector</div>
  )
}

export default ComboProductSelector