import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Form, Checkbox } from 'antd';
import './Login.css';

const Login = () => {
  const [err, setErr] = useState('');

  let navigate = useNavigate();
  const routeChange = () => {
    let path = '/shortenURL';
    navigate(path);
  };

  const handleLogin = async (values) => {
    setErr('');
    console.log(values.username);
    console.log(values.password);
  };

  return (
    <div className="login">
      <div>
        {err === '' ? (
          <p></p>
        ) : (
          <p className="failed-login">
            The username and password is incorrect. Please try again.
          </p>
        )}
      </div>
      <Form name="basic" onFinish={handleLogin} className="login-form">
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

        <Form.Item>
          <Checkbox className="login-form-remember">Remember me</Checkbox>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            LOG IN
          </Button>
          New to BabyURL?
          <Link id="signupLink" to="/signup">
            Sign Up
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;