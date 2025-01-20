// src/pages/Signup.js
import React from 'react';
import { Typography } from 'antd';
import SignupForm from '../components/Auth/SignupForm';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

const Signup = () => {
    const navigate = useNavigate();
    const handleSignupSubmit = async (values) => {
        try {
            const response = await axios.post('/auth/signup', values);
            if (response?.data?.status === "ok") {
                navigate('/login')
            }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }} >


            <div style={{ width: "50%", border: '1px dotted black', padding: "50px" }}>
                <Title level={2}>Sign Up</Title>
                <SignupForm onSubmit={handleSignupSubmit} />
            </div>
        </div>

    );
};

export default Signup;
