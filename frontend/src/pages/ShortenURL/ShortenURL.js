import React, { useState } from 'react';
import { Row, Button, Input, Table, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './ShortenURL.css';

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

  const handleGenerateURL = async (values) => {
    console.log(values.originalURL);
    const originalURL = values.originalURL;
    setData([
      ...data,
      {
        key: originalURL,
        originalURL: originalURL,
        babyURL: originalURL,
        delete: <DeleteOutlined />,
      },
    ]);
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
