import React from 'react';
import { Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

const signupValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const signupForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', email: ''}}
      validationSchema={signupValidationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Name" validateStatus={touched.name && errors.name ? 'error' : ''} help={touched.name && errors.name}>
            <Input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your name"
            />
          </Form.Item>
          <Form.Item label="Email" validateStatus={touched.email && errors.email ? 'error' : ''} help={touched.email && errors.email}>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
          </Form.Item>
         
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form>
      
      )}
    </Formik>
  );
};

export default signupForm;
