import React from 'react';
import { useState } from 'react';
import { message } from 'antd';

import { Layout, Menu, Avatar, Button, Dropdown, Tooltip } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  StarOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import {

  MessageOutlined,

  CommentOutlined,
} from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { DollarOutlined } from '@ant-design/icons';
import {
  FileTextOutlined,
  AuditOutlined,

  SwapOutlined,
} from '@ant-design/icons';
import Logo from "../../../assets/firesafety.webp";
import { Badge } from 'antd';

import { QuestionCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order Received',
      description: 'Order #12345 has been placed',
      time: '2 mins ago',
      read: false,
    },
    {
      id: 2,
      title: 'Stock Alert',
      description: 'Low stock for Product ABC',
      time: '10 mins ago',
      read: false,
    },
  ]);


  const profileMenu = (
    <Menu>
      <Menu.Item key="subuser" icon={<UsergroupAddOutlined />} onClick={() => navigate('/useraccess')} >
        Multi User Access
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        View Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const SettingMenu = (
    <Menu>
      <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
        Help
      </Menu.Item>
      <Menu.Item key="support" icon={<CustomerServiceOutlined />}>
        Support
      </Menu.Item>
    </Menu>
  );
  const NotificationDropdown = () => (
    <Menu style={{ width: 300 }}>
      {notifications.length === 0 ? (
        <Menu.Item disabled>No notifications</Menu.Item>
      ) : (
        notifications.map((n) => (
          <Menu.Item key={n.id} style={{ whiteSpace: 'normal', padding: '10px' }}>
            <div style={{ fontWeight: !n.read ? 'bold' : 'normal' }}>{n.title}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{n.description}</div>
            <div style={{ fontSize: 10, color: '#bbb' }}>{n.time}</div>
          </Menu.Item>
        ))
      )}
      <Menu.Divider />
      <Menu.Item onClick={() => message.info('Navigate to all notifications')}>View All</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #f0f4f8, #dff0e9)', minHeight: '100vh', padding: '20px', borderRadius: '32px' }}>
      <Layout style={{ minHeight: 'calc(100vh - 40px)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
        <Sider className="custumcss" width={240} style={{
       

  borderRight: '1px solid #f0f0f0',
  
   


        }}>
          <div className="logo" style={{ padding: '24px', fontWeight: 'bold', fontSize: '18px' }}>
            <img src={Logo} alt="Logo" />
          </div>
          <Menu
            className="custom-menu"
            mode="inline"
            selectedKeys={[currentPath]}
            defaultOpenKeys={['compliance']}
            style={{ width: 250,
                  height: '65vh',              
    overflowY: 'auto',           
    overflowX:"hidden"
             }}
            theme="light"
          >
            <Menu.Item
              key="/home"
              icon={<HomeOutlined />}
              onClick={() => navigate('/home')}
            >
              Dashboard
            </Menu.Item>

            <Menu.Item
              key="/product"
              icon={<TeamOutlined />}
              onClick={() => navigate('/product')}
            >
              Products
            </Menu.Item>

            <Menu.Item
              key="/order"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate('/order')}
            >
              Orders
            </Menu.Item>


            <Menu.Item
              key="/payments"
              icon={<DollarOutlined />}
              onClick={() => navigate('/payments')}

            >
              Payments
            </Menu.Item>

            <Menu.Item
              key="/reviews"
              icon={<StarOutlined />}
              onClick={() => navigate('/reviews')}

            >
              Reviews
            </Menu.Item>
            <Menu.SubMenu
              key="communicate"
              className="custom-menu"
              icon={<MessageOutlined />} // Represents overall messaging or communication
              title="communicate"
            >
              <Menu.Item
    key="/communication/support"
    icon={<CustomerServiceOutlined />} // Represents support or helpdesk
    onClick={() => navigate('/communication/support')}
                   style={{ margin: "0px 12px" }}
  >
    Support Communication
  </Menu.Item>

              <Menu.Item
                key="/communication/in-app"
                icon={<CommentOutlined />} // Represents chat, message, or feedback
                onClick={() => navigate('/communication/in-app')}
                style={{ margin: "0px 12px" }}
              >
                Buyer Communication
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="compliance"
              className="custom-menu"
              icon={<AuditOutlined />}
              title="Compliance"
            >
              <Menu.Item key="/compliance/gst-reports" icon={<FileTextOutlined />} onClick={() => navigate('/compliance/gst-reports')}   style={{ margin: "0px 12px" }}>
                GST Reports
              </Menu.Item>
              <Menu.Item key="/compliance/tax" icon={<FileTextOutlined />} onClick={() => navigate('/compliance/tax')}   style={{ margin: "0px 12px" }}>
                Tax Compliance
              </Menu.Item>
              <Menu.Item key="/compliance/policies" icon={<SettingOutlined />} onClick={() => navigate('/compliance/policies')}  style={{ margin: "0px 12px" }} >
                Business Policies
              </Menu.Item>
              <Menu.Item key="/compliance/refund-policy" icon={<SwapOutlined />} onClick={() => navigate('/compliance/refund-policy')}  style={{ margin: "0px 12px" }}>
                Refund & Exchange
              </Menu.Item>
            </Menu.SubMenu>



          </Menu>

          <div className='textwhite' style={{ position: 'absolute', bottom: 15, width: '100%', textAlign: 'center' }}>
       
              <Dropdown overlay={SettingMenu} trigger={['click']}>
                <Button icon={<SettingOutlined />} style={{ marginTop: 12 }} />
              </Dropdown>

            </div>


      
        </Sider>

        <Layout>
          <Header
            className='textred'
            style={{
              background: '#fff',
              margin: '16px 16px 0',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              <h2 style={{ marginBottom: 0 }}>Fire Safety</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Dropdown overlay={NotificationDropdown()} trigger={['click']} placement="bottomRight">
                <Tooltip title="Notifications">
                  <Badge count={notifications.filter(n => !n.read).length} size="small">
                    <BellOutlined style={{ fontSize: 22, cursor: 'pointer' }} />
                  </Badge>
                </Tooltip>
              </Dropdown>

              <Dropdown overlay={profileMenu} trigger={['click']} style={{
                width: '11vw',
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                margin: 'auto',
                flexDirection: 'column',
              }}>
                <div className='textred' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <Avatar className='custumcss' icon={<UserOutlined />} size="small" />
                  <span style={{ marginLeft: 8, fontWeight: 500 }}>Seller</span>
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content
            style={{
              margin: '16px',
              padding: '24px',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 152px)',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
