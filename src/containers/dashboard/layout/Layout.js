import React from 'react';
import { Layout, Menu, Avatar, Card, Button,Dropdown, Tooltip } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  FileTextOutlined,
  DollarOutlined,
  MessageOutlined,
  BellOutlined,
  PlusOutlined,
  SettingOutlined,
    UserOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import Logo from "../../../assets/firesafety.webp"
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const arr=[]

    const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        View Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{ background: 'linear-gradient(to bottom right, #f0f4f8, #dff0e9)', minHeight: '100vh', padding: '20px', borderRadius: '32px' }}>
      <Layout  style={{ minHeight: 'calc(100vh - 40px)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', }}>
        <Sider className="custumcss" width={240} style={{  borderRight: '1px solid #f0f0f0' }}>
          <div className="logo" style={{ padding: '24px', fontWeight: 'bold', fontSize: '18px' }}><img src={Logo}></img></div>
            <Menu
      className="custom-menu"
      mode="inline"
     
    >
      <Menu.Item
       
        icon={<HomeOutlined />}
        onClick={() => navigate('/home')}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
      
        icon={<TeamOutlined />}
      >
        Project
      </Menu.Item>
    </Menu>
          <div className='textwhite' style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
            <Avatar size={48} src="https://i.pravatar.cc/150?img=10" />
            <div style={{ marginTop: 8, fontWeight: 500 }}>Anshika Singhal</div>
            <div style={{  fontSize: 12 }}>ash@gmail.com</div>
            <Button icon={<SettingOutlined />} style={{ marginTop: 12 }} />
          </div>
        </Sider>
        <Layout>
          <Header className='textred' style={{ background: '#fff', margin: '16px 16px 0', borderRadius: '16px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div>
              <h2 style={{ marginBottom: 0 }}>Fire Safety</h2>
              {/* <p style={{ margin: 0, color: '#999' }}>Welcome, Annette!</p> */}
            </div>
            <div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Tooltip title="Notifications">
              <BellOutlined className='textred' style={{ fontSize: 22,  cursor: 'pointer' }} />
            </Tooltip>
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <div className='textred' style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar className='custumcss' icon={<UserOutlined />} size="small" />
                <span style={{ marginLeft: 8, fontWeight: 500 }}>Seller</span>
             
              </div>
            </Dropdown>
          </div>
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
    maxHeight: 'calc(100vh - 152px)' // adjust as needed
  }}
>
  <div>
    <Outlet />
  </div>
</Content>

        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;