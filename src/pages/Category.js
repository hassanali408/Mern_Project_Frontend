import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Input, Button, Table, Modal, Form, message } from 'antd';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories/get', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post('/categories/create', { name: newCategory }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories([...categories, response.data]);
      setNewCategory('');
      message.success('Category added successfully!');
    } catch (error) {
      console.error('Error creating category:', error);
      message.error('Error creating category');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await axios.put(`/categories/update/${editingCategory._id}`, { name: editCategoryName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const updatedCategories = categories.map((category) =>
        category._id === editingCategory._id ? response.data : category
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditCategoryName('');
      setIsModalVisible(false);
      message.success('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      message.error('Error updating category');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/categories/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories(categories.filter((category) => category._id !== id));
      message.success('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error(error.response?.data?.message);
    }
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => { setEditingCategory(record); setEditCategoryName(record.name); setIsModalVisible(true); }}>Edit</Button>
          <Button type="danger" onClick={() => handleDeleteCategory(record._id)} style={{ marginLeft: 10 }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Category </h1>

      <Input
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Enter category name"
        style={{ width: 200, marginBottom: 20 }}
      />
      <Button type="primary" onClick={handleCreateCategory} style={{ marginLeft: 10 }}>Add Category</Button>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        style={{ marginTop: 20 }}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Edit Category"
        open={isModalVisible}
        onOk={handleUpdateCategory}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Category Name">
            <Input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Edit category name"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
