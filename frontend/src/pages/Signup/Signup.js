import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Form } from 'antd';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (values) => {
    setErr('');
    console.log(values.username);
    console.log(values.password);

    const username = values.username;
    const password = values.password;

    try {
      await axios
        .post(
          'http://127.0.0.1:5000/signup',
          { username, password },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          setSuccess(true);
          console.log(JSON.stringify(response.data, null, 4));
        });
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div className="signup">
      <div>
        {err !== '' && (
          <p className="failed-signup">
            The username is taken. Please try again.
          </p>
        )}
      </div>
      <div>
        {success === true && (
          <p className="successful-signup">
            You have signed up successfully. Please proceed to log in.
          </p>
        )}
      </div>

      <Form name="basic" onFinish={handleSignup} className="signup-form">
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" type="text" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="password2"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            SIGN UP
          </Button>
          <Link to="/login">Back to login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
