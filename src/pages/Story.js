import React, { useState, useEffect } from 'react';
import { Input, Button, Table, message } from 'antd';
import axios from '../utils/axios';

const Story = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/stories/get', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        setHistory(response?.data);
      } catch (err) {
        message.error('Error fetching story history');
      }
    };

    fetchHistory();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!prompt) {
        message.warning('Please enter a prompt!');
        return;
      }

      setLoading(true); 
      const response = await axios.post('stories/generate-story', { prompt }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setStory(response.data.story);

      setHistory([...history, { prompt, story: response.data.story }]);
      message.success('Story generated successfully!');
    } catch (err) {
      message.error('Error generating story');
    } finally {
      setLoading(false); 
    }
  };

  const columns = [
    {
      title: 'Story Prompt',
      dataIndex: 'prompt',
      key: 'prompt',
    },
    {
      title: 'Generated Story',
      dataIndex: 'story',
      key: 'story',
      render: (text) => <p>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Story Generator</h1>

      <Input.TextArea
        rows={4}
        placeholder="Enter your story idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading} 
        style={{ marginBottom: '20px' }}
      >
        Generate Story
      </Button>

      {story && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Generated Story:</h2>
          <p>{story}</p>
        </div>
      )}

      <h2>Story History:</h2>
      <Table
        columns={columns}
        dataSource={history}
        rowKey="createdAt"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}

export default Story;
