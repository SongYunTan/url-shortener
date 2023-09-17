import React, { useState, useEffect } from 'react';
import { Row, Button, Input, Table, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './ShortenURL.css';
import axios from 'axios';

const columns = [
  {
    title: 'Original URL',
    dataIndex: 'originalURL',
    key: 'originalURL',
  },
  {
    title: 'Baby URL',
    dataIndex: 'babyURL',
    key: 'babyURL',
  },
  {
    title: 'Delete',
    dataIndex: 'delete',
    key: 'delete',
  },
];

const ShortenURL = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userID = sessionStorage.getItem('id');
    console.log(userID);
    if (userID !== null) {
      getSavedURLs(userID);
    }
  }, []);

  const getSavedURLs = async (userID) => {
    try {
      await axios
        .get('http://127.0.0.1:5000/saved-urls', {
          params: { userID },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 4));
          setData(
            response.data['urls'].map((url) => {
              return {
                key: url[0],
                originalURL: url[0],
                babyURL: url[1],
                delete: <DeleteOutlined />,
              };
            })
          );
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGenerateURL = async (values) => {
    console.log(values.originalURL);
    const originalURL = values.originalURL;
    const userID = sessionStorage.getItem('id');
    try {
      await axios
        .post(
          'http://127.0.0.1:5000/shortened-url',
          { userID, originalURL },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          console.log(JSON.stringify(response.data, null, 4));
          if (response.data['exists'] === false) {
            setData([
              ...data,
              {
                key: originalURL,
                originalURL: originalURL,
                babyURL: response.data['shortenedURL'],
                delete: <DeleteOutlined />,
              },
            ]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="shortenURL">
      <Form
        name="basic"
        onFinish={handleGenerateURL}
        className="shortenURL-form"
      >
        <Row>
          <Form.Item
            name="originalURL"
            rules={[{ required: true, message: 'Please input URL!' }]}
          >
            <Input placeholder="URL" type="text" className="shortenURL-input" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Generate Baby URL
          </Button>
        </Row>
      </Form>

      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default ShortenURL;
