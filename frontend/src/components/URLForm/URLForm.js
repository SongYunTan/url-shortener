import React, { useState } from 'react';
import { Row, Button, Input, Form, Select } from 'antd';
import DeleteIcon from '../DeleteIcon/DeleteIcon';
import axios from 'axios';
import './URLForm.css';

const host = window.location.host + '/';

const URLForm = ({ data, setData }) => {
  const [shortenedURL, setShortenedURL] = useState('');

  const handleGenerateURL = async (values) => {
    console.log(values.originalURL);
    const originalURL = values.originalURL;
    const userID = sessionStorage.getItem('id');
    try {
      await axios
        .post(
          'https://baby-url-backend-7b27c2fd1375.herokuapp.com/shortened-url',
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
            const link = 'http://' + host + response.data['shortenedURL'];
            setData([
              ...data,
              {
                key: response.data['id'],
                originalURL: originalURL,
                babyURL: <a href={link}>{link}</a>,
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

  const { Option } = Select;
  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form name="basic" onFinish={handleGenerateURL} className="shortenURL-form">
      <Row>
        <Form.Item
          name="originalURL"
          rules={[{ required: true, message: 'Please input URL!' }]}
        >
          <Input
            placeholder="URL"
            type="text"
            addonBefore={selectBefore}
            className="shortenURL-input"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="shortenURL-button">
          Generate Baby URL
        </Button>
      </Row>
      <Row>
        {shortenedURL !== '' && (
          <p>
            Your new URL is{' '}
            <a href={'http://' + host + shortenedURL}>
              {'http://' + host + shortenedURL}
            </a>
          </p>
        )}
      </Row>
    </Form>
  );
};

export default URLForm;
