import React from 'react';
import { Card } from 'antd';
import { DollarOutlined, RiseOutlined, FileTextOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const cardStyle = {
  flex: 1,
  borderRadius: 16,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',

};

const titleStyle = {
  fontSize: 22,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'

};

const valueStyle = {
  fontSize: 28,
  fontWeight: 700,
  margin: '8px 0',
};

const changeStyle = {

  fontWeight: 500,
};

const HomeCard = () => {
  return (
    <div
      className="dashboard-cards"
      style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '24px',
        flexWrap: 'wrap',
      }}
    >
      {/* Total Sales */}
      <Card className="custumcss textwhite" style={{ ...cardStyle, padding: "0px" }}>
        <div style={titleStyle}>
          Total Sales
          <DollarOutlined style={{ fontSize: 20 }} />

        </div>
        <div style={{ ...valueStyle, }}>$1,200,550</div>
        <div style={changeStyle}>▲ +38% from last month</div>
      </Card>
      <Card className="custumcss textwhite" style={{ ...cardStyle, padding: "0px" }}>
        <div style={titleStyle}>
          New Order
          <DollarOutlined style={{ fontSize: 20 }} />

        </div>
        <div style={{ ...valueStyle, }}>1000 +</div>
        {/* <div style={changeStyle}>▲ +38% from last month</div> */}

      </Card>




      <Card className="custumcss textwhite" style={{ ...cardStyle, padding: "0px" }}>
        <div style={titleStyle}>
          Tax Report
          <FileTextOutlined style={{ fontSize: 20 }} />

        </div>
        <p style={{ fontSize: 16, marginTop: 12 }}>
          Submit your <strong>yearly tax report</strong> by <b>Oct 20</b>.
        </p>
      </Card>
      <Card className="custumcss textwhite" style={{ ...cardStyle, padding: "0px" }}>
        <div style={titleStyle}>
          Total Orders
          <ShoppingCartOutlined style={{ fontSize: 20 }} />

        </div>
        <div style={{ ...valueStyle, }}>32,480</div>
        <div style={changeStyle}>▲ +28% from last month</div>
      </Card>
    </div>
  );
};

export default HomeCard;
