import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Card,
  Switch,
  Row,
  Col,
  Upload,
  DatePicker,
  message,
  Breadcrumb,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { updateproduct } from '../../services/allService';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const { Option } = Select;

const EditProduct = () => {
  const branddropdowndart=useSelector(state=>state.brand.allapprovedbrand)
  console.log(branddropdowndart,branddropdowndart)
  const navigate=useNavigate()
  const particularproduct = useSelector(state => state?.product?.particularproduct);
  console.log("particularproduct",particularproduct)
  const [form] = Form.useForm();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (particularproduct) {
      const transformed = {
        ...particularproduct,
        name: particularproduct.name, // map name to title
  
      };
      setProduct(transformed);
      form.setFieldsValue(transformed);
    } else {
      message.error('Product not found');
    }
  }, [particularproduct, form]);

  const onFinish = async(values) => {
    const payload = {
      ...values,
// rename title back to name
    };
    console.log('✅ Updated Product Payload:', payload);
    const response= await updateproduct(payload,id)
    debugger;
    console.log(response)
    if(response.status==200){
      navigate('/product')
    }
    message.success('Product updated successfully!');
  };

  if (!product) return null;

  const breadcrumbItems = [
    { title: <Link to="/product">Products</Link> },
    { title: 'Edit Product' },
  ];
  const handleUpload = async (file, add) => {
    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileUrl = res.data.fileUrl;
      add(fileUrl);
      message.success('Image uploaded successfully');
    } catch (err) {
      console.error(err);
      message.error('Upload failed');
    }

    return false; // prevent default upload
  };
const handleBrandChange = (value) => {
  if (value === 'add-more') {
    navigate('/brand'); // Redirect to brand page
  } else {
    form.setFieldValue('brandAuth', value); // Set selected brand
  }
};
  return (
    <>
      <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />
      <Card title={`Edit Product: ${product.name}`}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Brand"
                name="brandAuth"
                rules={[{ required: true, message: 'Please select a brand' }]}
              >
                <Select placeholder="Select Brand" onChange={handleBrandChange}>
                  {branddropdowndart.map((brand) => (
                    <Option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </Option>
                  ))}
                  <Option value="add-more" disabled>
                    ─────────────
                  </Option>
                  <Option value="add-more">
                    ➕ Add More Brand
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Description" name="description" rules={[{ required: true }, { max: 500 }]}>
            <TextArea rows={3} maxLength={500} showCount />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Category" name="category" rules={[{ required: true }]}>
                <Select>
                  <Option value="FireSafety">Fire and Personal Safety</Option>
                </Select>
              </Form.Item>
            </Col>
                  <Col span={6}>
                          <Form.Item
                            label="Subcategory"
                            name="subcategory"
                       
                          >
                            <Input placeholder="Subcategory" />
                          </Form.Item>
                        </Col>
            <Col span={8}>
              <Form.Item label="Product Type" name="productType">
                <Input placeholder="e.g. Fire Extinguisher Ball" />
              </Form.Item>
            </Col>
             <Col span={8}>
                        <Form.Item label="Certification" name="certification">
                          <Input />
                        </Form.Item>
                      </Col>
          </Row>

          <Row gutter={16}>
            {/* <Col span={8}>
              <Form.Item label="Expiry Date" name="expiryDate">
                <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Maintenance Interval" name="maintenanceInterval">
                <Input placeholder="e.g. 5 years" />
              </Form.Item>
            </Col> */}
            <Col span={8}>
              <Form.Item label="Package Contents" name="packageContents">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

{/* Warranty & Policy Fields */}
<Row gutter={16}>
  <Col span={8}>
    <Form.Item label="Warranty Policy" name="warrantyPolicy">
      <TextArea rows={2} placeholder="e.g. 1 year warranty on manufacturing defects" />
    </Form.Item>
  </Col>
  <Col span={8}>
    <Form.Item label="Safety Information" name="safetyInformation">
      <TextArea rows={2} placeholder="e.g. Keep away from fire and direct sunlight" />
    </Form.Item>
  </Col>
  <Col span={8}>
    <Form.Item label="Return Policy" name="returnPolicy">
      <TextArea rows={2} placeholder="e.g. Return within 7 days if unused" />
    </Form.Item>
  </Col>
</Row>
          {/* Usage Class */}
          {/* <Card type="inner" title="Usage Class (e.g., Class A, B, C)">
            <Form.List name="usageClass">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={8} key={key}>
                      <Col span={20}>
                        <Form.Item {...restField} name={name} rules={[{ required: true }]}>
                          <Input placeholder="Class A / B / C" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Class
                  </Button>
                </>
              )}
            </Form.List>
          </Card> */}

          {/* Variations */}
        {product.variations.length!==0 ?  <Card type="inner" title="Product Variations" style={{ marginTop: 20 }}>
            <Form.List name="variations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'label']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Label" />
                        </Form.Item>
                      </Col>
                       <Col span={4}>
                                      <Form.Item {...restField} name={[name, 'mrp']} rules={[{ required: true }]}>
                                        <InputNumber min={0} placeholder="MRP" style={{ width: '100%' }} />
                                      </Form.Item>
                                    </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'price']}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} placeholder="Price" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item {...restField} name={[name, 'discount']}>
                          <InputNumber
                            min={0}
                            max={100}
                            placeholder="Discount %"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'stock']}
                          rules={[{ required: true }]}
                        >
                          <InputNumber min={0} placeholder="Stock" style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          {...restField}
                          name={[name, 'sku']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="SKU" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>Remove</Button>
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Variation
                  </Button>
                </>
              )}
            </Form.List>
          </Card>
          :<>
            <Row gutter={16}>
              <Col span={8}>
     
                              
                                   <Form.Item
                              label="MRP"
                              name="mrp"
                              rules={[
                                {
                                
                                  message: 'mrp is required when no variations',
                                },
                              ]}
                            >
                              <Input placeholder="MRP"  />
                            </Form.Item>
                       
                 <Form.Item
                              label="SKU"
                              name="sku"
                              rules={[
                                {
                                
                                  message: 'SKU is required when no variations',
                                },
                              ]}
                            >
                              <Input placeholder="SKU"  />
                            </Form.Item>
              </Col>
                  <Col span={8}>
                     <Form.Item
                                  label="Price"
                                  name="price"
                                
                                >
                                  <InputNumber
                                    min={0}
                                    style={{ width: '100%' }}
                                    prefix="₹"
                            
                                  />
                                </Form.Item>
              </Col>
                  <Col span={8}>
                  <Form.Item
                                  label="Discount (%)"
                                  name="discount"
                                  rules={[
                                    { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' },
                                  ]}
                                >
                                  <InputNumber min={0} max={100} style={{ width: '100%' }} suffix="%"  />
                                </Form.Item>
              </Col>
                  <Col span={8}>
                  <Form.Item
                                  label="Stock"
                                  name="stock"
                            
                                >
                                  <InputNumber min={0} style={{ width: '100%' }}  />
                                </Form.Item>
              </Col>
            </Row>
          </>}

          {/* Images */}
          <Card type="inner" title="Images (URLs or Upload)" style={{ marginTop: 20 }}>
        <Form.List name="images">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                  <Col span={20}>
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: 'Enter image URL' }]}
                    >
                      <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>
                    {/* Image Preview */}
                    <Form.Item noStyle shouldUpdate>
                      {() => {
                        const url = form.getFieldValue(['images', name]);
                        return (
                          url &&
                          <img src={url} alt="preview" style={{ width: '100px', marginBottom: 10 }} />
                        );
                      }}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button danger onClick={() => remove(name)}>Remove</Button>
                  </Col>
                </Row>
              ))}

              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Image URL
                  </Button>
                </Col>
                <Col span={12}>
                  <Upload
                    beforeUpload={(file) => handleUpload(file, (url) => add(url))}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button block icon={<UploadOutlined />}>
                      Upload Image
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </>
          )}
        </Form.List>
      </Card>
          {/* Compliance Documents */}
          {/* <Card type="inner" title="Compliance Documents (PDF URLs)" style={{ marginTop: 20 }}>
            <Form.List name="complianceDocuments">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row key={key} gutter={16} style={{ marginBottom: 8 }}>
                      <Col span={20}>
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Enter document URL' }]}
                        >
                          <Input placeholder="https://example.com/doc.pdf" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button danger onClick={() => remove(name)}>Remove</Button>
                      </Col>
                    </Row>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
                    Add Document
                  </Button>
                </>
              )}
            </Form.List>
          </Card> */}

          {/* Is Approved & Is Featured Switches */}
          {/* <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={6}>
              <Form.Item label="Is Approved" name="isApproved" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Is Featured" name="isFeatured" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row> */}

          {/* Submit Button */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default EditProduct;
