import React, {useState } from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { Link, Routes, Route, BrowserRouter as Router, useNavigate,useLocation,Navigate  } from 'react-router-dom';
import { HomeOutlined, AppstoreAddOutlined, EditOutlined } from '@ant-design/icons';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import Cars from './pages/Cars';
import Category from './pages/Category';
import Story from './pages/Story';
import axios from './utils/axios';

const { Header, Sider, Content } = Layout;

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<ProtectedLayout />} />
            </Routes>
        </Router>
    );
};

const ProtectedLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";
    const token = localStorage.getItem('token');

    if (!token && !isAuthRoute) {
        return <Navigate to="/login" replace />;
    }


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                '/auth/logout',
                { token: localStorage.getItem('token') },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            message.success('Logged out successfully!');
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            message.error('Error during logout');
        }
    };



    return (
        !isAuthRoute && (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" style={{ height: 64, textAlign: 'center', color: 'white', lineHeight: '64px' }}>
                    My App
                </div>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
                        <Link to="/category">Category</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<EditOutlined />}>
                        <Link to="/cars">Cars</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<EditOutlined />}>
                        <Link to="/story">Story</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div>
                </Header>

                <Content style={{ padding: '24px', minHeight: 280 }}>
                    <Routes>
                        <Route path="/" element={<DashBoard />} />
                        <Route path="/cars" element={<Cars />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/story" element={<Story />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
        )
    );
};

export default App;
