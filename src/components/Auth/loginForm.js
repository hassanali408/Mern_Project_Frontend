import React from 'react';
import { Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Email" validateStatus={touched.email && errors.email ? 'error' : ''} help={touched.email && errors.email}>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item label="Password" validateStatus={touched.password && errors.password ? 'error' : ''} help={touched.password && errors.password}>
            <Input.Password
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
