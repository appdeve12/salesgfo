import React from 'react';
import { Tabs, Table, Card, Tag, Row, Col, Button, Space, message } from 'antd';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
const { TabPane } = Tabs;

// 🧾 Payment history with product details
const paymentHistoryData = [
  {
    key: '1',
    date: '2025-06-18',
    orderId: 'ORD123',
    products: ['Wireless Headphones', 'Bluetooth Speaker'],
    amount: '₹4,200',
    method: 'Bank Transfer',
    status: 'Success',
  },
  {
    key: '2',
    date: '2025-06-17',
    orderId: 'ORD124',
    products: ['Running Shoes'],
    amount: '₹2,100',
    method: 'UPI',
    status: 'Pending',
  },
  {
    key: '3',
    date: '2025-06-17',
    orderId: 'ORD124',
    products: ['Running Shoes'],
    amount: '₹2,100',
    method: 'UPI',
    status: 'Pending',
  },
];

// 💰 Commission breakdown
const commissionData = [
  {
    key: '1',
    orderId: 'ORD123',
    product: 'Wireless Headphones',
    commission: '₹150',
    fee: '₹20',
    total: '₹170',
  },
  {
    key: '2',
    orderId: 'ORD124',
    product: 'Running Shoes',
    commission: '₹200',
    fee: '₹25',
    total: '₹225',
  },
];

// 📊 Payment history table columns


// 📊 Commission table columns
const commissionColumns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Commission',
    dataIndex: 'commission',
  },
  {
    title: 'Platform Fee',
    dataIndex: 'fee',
  },
  {
    title: 'Total Deductions',
    dataIndex: 'total',
  },
];

// ✅ Main Component
const PaymentsAndSettlements = () => {
  const navigate = useNavigate();
  // Excel export utility
  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${fileName}.xlsx`);
    message.success(`${fileName}.xlsx downloaded`);
  };

  // 📦 Export-ready settlement data
  const settlementExportData = [
    {
      title: "This Week's Settlement",
      amount: '₹12,500',
      status: 'Processed',
      date: '10–16 June',
    },
    {
      title: "Yesterday's Settlement",
      amount: '₹2,500',
      status: 'Pending',
      date: '18 June',
    },
    {
      title: 'Next Scheduled Settlement',
      amount: '₹6,000',
      status: 'Upcoming',
      date: '20 June 2025',
    },
  ];
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
useEffect(()=>{

},[])
  if (loading) {
    return <Spinner />
  }

  const paymentColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Product(s)',
    dataIndex: 'products',
    render: (products) => products.map((p, i) => <Tag key={i}>{p}</Tag>),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Method',
    dataIndex: 'method',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (
      <Tag color={status === 'Success' ? 'green' : 'orange'}>{status}</Tag>
    ),
  },
  {
  title: 'Action',
  render: (_, record) => (
    <Button
      type="link"
      onClick={() => navigate(`/payments/details/${record.orderId}`, { state: { order: record } })}
    >
      View Details
    </Button>
  ),
}

];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Payments & Settlements</h2>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Payment History & Status" key="1" >
          <Card
            title={
             
                <Button onClick={() => exportToExcel(paymentHistoryData, 'Payment_History')} className="custumcss textwhite">
                  Export to Excel
                </Button>
         
            }
            bordered={false}
          >
            <Table
              dataSource={paymentHistoryData}
              columns={paymentColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
        
        

        <TabPane tab="Commission & Fees" key="2">
          <Card
            title={
           
                
                <Button className="custumcss textwhite" onClick={() => exportToExcel(commissionData, 'Commission_Fees')} >
                  Export to Excel
                </Button>
         
            }
            bordered={false}
          >
            <Table
              dataSource={commissionData}
              columns={commissionColumns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </TabPane>
     


        <TabPane tab="Payment Settlements" key="3">
          <Card
            title={
          
                <Button className="custumcss textwhite" onClick={() => exportToExcel(settlementExportData, 'Settlements')} >
                  Export to Excel
                </Button>

            }
            bordered={false}
          />
          <Row gutter={16}>
            <Col span={8}>
              <Card title="This Week's Settlement" bordered={false}>
                <p><strong>Amount:</strong> ₹12,500</p>
                <p><strong>Status:</strong> <Tag color="green">Processed</Tag></p>
                <p><strong>Date:</strong> 10–16 June</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Yesterday's Settlement" bordered={false}>
                <p><strong>Amount:</strong> ₹2,500</p>
                <p><strong>Status:</strong> <Tag color="orange">Pending</Tag></p>
                <p><strong>Date:</strong> 18 June</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Next Scheduled Settlement" bordered={false}>
                <p><strong>Date:</strong> 20 June 2025</p>
                <p><strong>Expected Amount:</strong> ₹6,000</p>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PaymentsAndSettlements;
