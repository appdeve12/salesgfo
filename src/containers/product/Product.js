import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  message,
  Popconfirm,
  Upload,
  Input
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import Spinner from '../../components/Spinner';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // mock fetch
  useEffect(() => {
    const mockProducts = [
      {
        id: '1',
        title: 'Wireless Headphones',
        description: "good for use",
        brand: 'Sony',
        category: 'electronics',
        price: 2999,
        quantity: 25,
        inStock: true,
        sku: 'SONY123',
      },
      {
        id: '2',
        title: 'Running Shoes',
        description: "good for use",
        brand: 'Nike',
        category: 'clothing',
        price: 4500,
        quantity: 0,
        inStock: false,
        sku: 'NIKE567',
      },
    ];
    setProducts(mockProducts);
  }, []);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    message.success('Product deleted');
  };

  // Handle Excel/CSV upload
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = parsedData.map((item, index) => ({
        id: (products.length + index + 1).toString(),
        inStock: item.quantity > 0,
        ...item,
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
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Price (₹)', dataIndex: 'price', key: 'price' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Handling Time', dataIndex: 'handlingtime', key: 'handlingtime' },
    {
      title: 'Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock, record) =>
        inStock ? (
          <Tag color="green">In Stock ({record.quantity})</Tag>
        ) : (
          <Tag color="red">Out of Stock</Tag>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${record.id}`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(record.id);
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
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
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
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/product/${record.id}`),
          style: { cursor: 'pointer' },
        })}
      />
    </>
  );
};

export default Product;
