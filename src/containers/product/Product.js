import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // mock fetch
  useEffect(() => {
    const mockProducts = [
      {
        id: '1',
        title: 'Wireless Headphones',
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock, record) =>
        inStock ? <Tag color="green">In Stock ({record.quantity})</Tag> : <Tag color="red">Out of Stock</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/edit`)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>All Products</h2>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default Product;
