import React, { useState } from 'react';
import { Row, Button, Input, Form } from 'antd';
import DeleteIcon from './DeleteIcon';
import axios from 'axios';

const URLForm = ({ data, setData }) => {
  const [shortenedURL, setShortenedURL] = useState('');

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
          setShortenedURL(response.data['shortenedURL']);
          if (response.data['exists'] === false) {
            setData([
              ...data,
              {
                key: response.data['id'],
                originalURL: originalURL,
                babyURL: response.data['shortenedURL'],
                delete: (
                  <DeleteIcon
                    urlID={response.data['id']}
                    data={data}
                    setData={setData}
                  />
                ),
              },
            ]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form name="basic" onFinish={handleGenerateURL} className="shortenURL-form">
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
      <Row>
        {shortenedURL !== '' && (
          <p>Your new URL is {window.location.host + '/' + shortenedURL}</p>
        )}
      </Row>
    </Form>
  );
};

export default URLForm;
