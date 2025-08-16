import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
  message,
  DatePicker,
  Breadcrumb,
  Upload
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addproduct } from '../../services/allService';
import { useNavigate } from 'react-router-dom';
import MediaUpload from './MediaUpload';
import ComboProductSelector from './ComboProductSelector';
const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
const branddropdowndart=useSelector(state=>state.brand.allapprovedbrand)
console.log(branddropdowndart,branddropdowndart)
  const navigate=useNavigate()
  const [form] = Form.useForm();
  const [hasVariations, setHasVariations] = useState(false);
  const [storebrandurl, setstorebrandurl] = useState(null);
  const onHasVariationsChange = (checked) => {
    setHasVariations(checked);
    if (checked) {
      // Clear main price, sku, stock fields when variations enabled
      form.setFieldsValue({ price: null, sku: null, stock: null });
    }
  };
const categoryOptions = [
  'Petrol & Oil Burning',
  'Offices & Banks',
  'Light Manufacturing',
  'Machining Operations',
  'Welding Areas',
  'Warehouses',
  'Gas/Fueling Stations',
  'Hotels',
  'Paint Processing Areas',
  'Schools',
  'Restaurants',
  'Parking Garages',
  'Material Handling Vehicles',
  'Maintenance Facilities',
  'Construction Sites',
  'Propane Filling And Storage',
  'Repair Shops',
  'Electrical Equipment Rooms'
];
  const onFinish = async (values) => {
    console.log('Final Product Data:', values);
    delete values.hasVariations;
    values.brandImage=storebrandurl
    values.images=values.images.map((img)=>img.url);

        console.log('Final updated Product Data:', values);
        const response=await addproduct(values)
        if(response.status===201){
           message.success('Product submitted!');
           navigate("/product")

        }

  };
    const handleUpload = async (file, add) => {
    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileUrl = res.data.fileUrl;

      add({ url: fileUrl });
      message.success('File uploaded successfully');
    } catch (err) {
      console.error(err);
      message.error('Upload failed');
    }

    return false; // prevent default upload behavior
  };
      const handleBRANDUpload = async (file) => {
    const formData = new FormData();
    formData.append('media', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const fileUrl = res.data.fileUrl;
setstorebrandurl(fileUrl)

      message.success('File uploaded successfully');
    } catch (err) {
      console.error(err);
      message.error('Upload failed');
    }

    return false; // prevent default upload behavior
  };
  
    const breadcrumbItems = [
    {
      title: <Link to="/product">Products</Link>,
    },
    {
      title: 'Add Product',
    },
  ];
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

      <Card>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            price: 0,
            discount: 0,
            stock: 0,
            hasVariations: false,
          }}
        >
          {/* Has Variations Switch */}
          <Form.Item label="Has Variations" valuePropName="checked" name="hasVariations">
            <Switch onChange={onHasVariationsChange} />
          </Form.Item>

          {/* Basic Product Info */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Product name is required' }]}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="SKU"
                name="sku"
                rules={[
                  {
                    required: !hasVariations,
                    message: 'SKU is required when no variations',
                  },
                ]}
              >
                <Input placeholder="SKU" disabled={hasVariations} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Top HighLights"
            name="tophighlights"
            rules={[
              { required: true, message: 'Top HighLights is required' },
              { max: 1000, message: 'Top HighLights must be 500 characters or fewer' },
            ]}
          >
            <TextArea rows={3} placeholder="Product HighLight" maxLength={1000} showCount />
          </Form.Item>
             <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Description is required' },
              { max: 500, message: 'Description must be 500 characters or fewer' },
            ]}
          >
            <TextArea rows={3} placeholder="Product Description" maxLength={500} showCount />
          </Form.Item>

          <Row gutter={16}>
             <Col span={6}>
    <Form.Item
      label="MRP"
      name="mrp"
      rules={[{ required: !hasVariations, message: 'MRP is required when no variations' }]}
    >
      <InputNumber
        min={0}
        style={{ width: '100%' }}
        prefix="₹"
        disabled={hasVariations}
      />
    </Form.Item>
  </Col>
            <Col span={6}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: !hasVariations,
                    message: 'Price is required when no variations',
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  prefix="₹"
                  disabled={hasVariations}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Discount (%)"
                name="discount"
                rules={[
                  { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' },
                ]}
              >
                <InputNumber min={0} max={100} style={{ width: '100%' }} suffix="%" disabled={hasVariations} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[
                  {
                    required: !hasVariations,
                    message: 'Stock quantity is required when no variations',
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: '100%' }} disabled={hasVariations} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: 'Category is required' }]}
              >
                <Select placeholder="Select Category">
                  <Option value="firesafety">Fire and Personal Safety</Option>
                  {/* Add more categories as needed */}
                </Select>
              </Form.Item>
            </Col>
              <Col span={6}>
      <Form.Item
        label="Usage Class"
        name="usageClass"
    
      >
        <Select
          mode="multiple"
          placeholder="Select Usage Class"
          className="custom-category-select"
          allowClear
        >
          {categoryOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
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


            <Col span={6}>
              <Form.Item
            label="Package Contents"
            name="packageContents"
          >
            <TextArea rows={2} placeholder="Contents of the package" />
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

          <Row gutter={16}>
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



{/* Preview Image */}
<Form.Item noStyle shouldUpdate>
  {() => {
    const url = form.getFieldValue("brandImage");
    return url ? (
      <img
        src={url}
        alt="Brand Preview"
        style={{ width: 150, marginTop: 10, border: "1px solid #ddd", padding: 4 }}
      />
    ) : null;
  }}
</Form.Item>


{/* Show preview */}
<Form.Item noStyle shouldUpdate>
  {() => {
    const url = form.getFieldValue("brandImage");
    return url ? (
      <img src={url} alt="brand" style={{ width: 120, marginTop: 10 }} />
    ) : null;
  }}
</Form.Item>


{/* Preview */}
<Form.Item shouldUpdate noStyle>
  {() => {
    const url = form.getFieldValue("brandImage");
    return url ? <img src={url} alt="brand" style={{ width: 100, marginTop: 10 }} /> : null;
  }}
</Form.Item>


          {/* Variations Section */}
     {hasVariations && (
  <Card type="inner" title="Product Variations" style={{ marginTop: 20 }}>
    <Form.List name="variations" rules={[
      {
        validator: async (_, variations) => {
          if (!variations || variations.length < 1) {
            return Promise.reject(new Error('At least one variation required'));
          }
        },
      },
    ]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Row gutter={16} key={key} style={{ marginBottom: 8 }} align="middle">
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'label']} rules={[{ required: true }]}>
                  <Input placeholder="Label" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'mrp']} rules={[{ required: true }]}>
                  <InputNumber min={0} placeholder="MRP" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'price']} rules={[{ required: true }]}>
                  <InputNumber min={0} placeholder="Price" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'discount']}>
                  <InputNumber min={0} max={100} placeholder="Discount %" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'stock']} rules={[{ required: true }]}>
                  <InputNumber min={0} placeholder="Stock" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item {...restField} name={[name, 'sku']} rules={[{ required: true }]}>
                  <Input placeholder="SKU" />
                </Form.Item>
              </Col>
              <Col span={2}>
                <Button danger onClick={() => remove(name)}>Remove</Button>
              </Col>
            </Row>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block>
              Add Variation
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Card>
)}

             {/* Media Uploads */}
      <Card type="inner" title="Media Upload (Images & Videos)" style={{ marginTop: 20 }}>
        <Form.List name="images">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={16} key={key} style={{ marginBottom: 8 }}>
                  <Col span={18}>
                    <Form.Item
                      {...restField}
                      name={[name, 'url']}
                      rules={[{ required: true, message: 'Please upload or enter image URL' }]}
                    >
                      <Input placeholder="Image/Video URL" />
                    </Form.Item>
                    <Form.Item noStyle shouldUpdate>
                      {() => {
                        const value = form.getFieldValue(['images', name, 'url']);
                        return value && (
                          value.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video src={value} width="100%" controls />
                          ) : (
                            <img src={value} alt="media" style={{ width: '100%', maxHeight: 200 }} />
                          )
                        );
                      }}
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button danger onClick={() => remove(name)} style={{ marginTop: 4 }}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Upload
                  beforeUpload={(file) => handleUpload(file, add)}
                  showUploadList={false}
                  accept="image/*,video/*"
                >
                  <Button icon={<PlusOutlined />} type="dashed" block>
                    Upload Media
                  </Button>
                </Upload>
              </Form.Item>
            </>
          )}
        </Form.List>
        <ComboProductSelector form={form} />

      </Card>
          {/* Submit */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" block>
              Save Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddProduct;
