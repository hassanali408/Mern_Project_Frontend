import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Table, message, Form } from 'antd';
import axios from '../utils/axios';

const Cars = () => {
  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [newCar, setNewCar] = useState({ model: '', make: '', color: '', registrationNo: '', category: '' });

  useEffect(() => {
    fetchCategories();
    fetchCars(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories/get', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories(response?.data?.categories);
    } catch (err) {
      message.error('Error fetching categories');
    }
  };

  const fetchCars = async (page, size) => {
    try {
      const response = await axios.get(`/cars/get?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCars(response?.data?.cars);
      setTotalCars(response?.data?.totalCars);
    } catch (err) {
      message.error('Error fetching cars');
    }
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/cars/create', newCar, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const categoryObject = categories.find(category => category._id === newCar.category);
      const newCarWithCategory = { ...response?.data, category: categoryObject };
      setCars([...cars, newCarWithCategory]);
      setNewCar({ model: '', make: '', color: '', registrationNo: '', category: '' });
      message.success('Car added successfully!');
      fetchCars(currentPage, pageSize); 
    } catch (error) {
      console.error('Error adding car:', error);
      message.error('Error adding car');
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Registration No',
      dataIndex: 'registrationNo',
      key: 'registrationNo',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category?.name || 'N/A',
    },
  ];

  return (
    <div>
      <h1>Car Management</h1>

      <Form onSubmitCapture={handleCarSubmit} layout="inline" style={{ marginBottom: '20px' }}>
        <Form.Item>
          <Input
            value={newCar?.model}
            onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
            placeholder="Model"
            required
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={newCar?.make}
            onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
            placeholder="Make"
            required
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={newCar?.color}
            onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
            placeholder="Color"
            required
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            value={newCar?.registrationNo}
            onChange={(e) => setNewCar({ ...newCar, registrationNo: e.target.value })}
            placeholder="Registration No"
            required
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item>
          <Select
            value={newCar?.category || undefined}
            onChange={(value) => setNewCar({ ...newCar, category: value })}
            placeholder="Select Category"
            required
            style={{ width: 150 }}
          >
            {categories?.map(category => (
              <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Car</Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={cars}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalCars,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Cars;
