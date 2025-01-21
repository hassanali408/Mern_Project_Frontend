// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const Dashboard = () => {
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    axios.get('/cars/get', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => setCarCount(res?.data?.cars?.length))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Number of registered cars: {carCount}</p>
    </div>
  );
};

export default Dashboard;


