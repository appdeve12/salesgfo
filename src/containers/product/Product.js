import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Popconfirm,
  Upload,
  Input,
  Switch, Form,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Spinner from '../../components/Spinner';
import { deleteorarchivedproduct, getallsellerproduct } from '../../services/allService';
import { useDispatch } from 'react-redux';
import { setparticularproduct } from '../../redux/productSlice';

const Product = () => {
  const dispatch=useDispatch()
    const [allproduct, setAllProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
    const [hasCombo, setHasCombo] = useState(false);

    const onHasComboChange = (checked) => {
    debugger;
      setHasCombo(checked);
      if (checked) {
const comboproduct=allproduct.filter(item=>item.isCombo===true);
setProducts(comboproduct)
      }
      else{
      const comboproduct=allproduct.filter(item=>item.isCombo===false);
setProducts(comboproduct)
      }
    };
  
  const navigate = useNavigate();

  const fetchAllProduct = async () => {
    try {
      const response = await getallsellerproduct();
      console.log("response", response);
      console.log("response", response);
      setAllProduct(response.data)
      const updateproduct=response.data.filter((item)=>item.isCombo==true)
  setProducts(updateproduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
 
  const handleDelete = async(id) => {
    const response=await deleteorarchivedproduct(id);
    if(response.status==200){
      fetchAllProduct()
          message.success('Product deleted');
    }

    message.success('Product deleted');
  };
  const handleedit=(reacord)=>{
    console.log("reacord",reacord)
    dispatch(setparticularproduct(reacord))
  }

  // Excel Upload Handler
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = parsedData.map((item, index) => ({
        _id: `temp-${Date.now()}-${index}`, // Temporary ID for frontend
        name: item.name || 'Unnamed Product',
        brand: item?.brandAuth?.brandName || 'N/A',
        category: item.category || 'Uncategorized',
        isApproved: false
      }));

      setProducts((prev) => [...prev, ...formattedData]);
      message.success('Bulk products uploaded successfully');
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  const uploadProps = {
    beforeUpload: handleFileUpload,
    showUploadList: false,
    accept: '.xlsx, .xls, .csv',
  };

  const columns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    { title: 'Brand', key: 'brand' ,   render: (_, record) => record.brandAuth?.brandName || 'N/A',},
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status',
      dataIndex: 'isApproved',
      key: 'isApproved',
      render: (isApproved) => (
        <Tag color={isApproved ? 'green' : 'orange'}>
          {isApproved ? 'Approved' : 'Pending'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        
        <Space>
         <Button
  onClick={(e) => {
    e.stopPropagation();
    handleedit(record);

    if (record.isCombo==false) {
      navigate(`/edit/${record._id}`);
    } else {
      navigate(`/editcombo/${record._id}`);
    }
  }  }
>
  Edit
</Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(record._id);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const AddProduct = () => {
    navigate('/addproduct');
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <h2>All Products</h2>
                <Form.Item label="Has Combo" valuePropName="checked" name="hasCombo">
            <Switch onChange={onHasComboChange} />
          </Form.Item>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Input.Search
            placeholder="Search by product name"
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 250 }}
          />
          <Button className="custumcss textwhite" onClick={AddProduct}>
            Add Product
          </Button>
           <Button className="custumcss textwhite" onClick={AddProduct}>
            Create Combo Product
          </Button>
          <Upload {...uploadProps}>
            <Button className="custumcss textwhite" icon={<UploadOutlined />}>
              Upload Bulk Products
            </Button>
          </Upload>
        </div>
      </div>

      <Table
        className="custum-pedding-cell"
        columns={columns}
        dataSource={filteredProducts}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/product/${record._id}`),
          style: { cursor: 'pointer' },
        })}
      />
    </>
  );
};

export default Product;
