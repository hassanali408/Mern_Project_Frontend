import React from 'react';
import { Typography } from 'antd';
import axios from '../utils/axios';
import LoginForm from '../components/Auth/loginForm';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const Login = () => {
    const navigate =useNavigate();
  const handleLoginSubmit = async (values) => {
    try {
      const response = await axios.post('/auth/login', values);
      if(response?.data?.token){
        localStorage.setItem("token",response?.data?.token)
        navigate('/');
      }

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:"100vh"}} >


    <div style={{width:"50%" , border:'1px dotted black',padding:"50px"}}>
      <Title level={2}>Login</Title>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
    </div>
  );
};

export default Login;
