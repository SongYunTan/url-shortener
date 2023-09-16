import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form } from 'antd';
import './Signup.css';


const Signup = () => {
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  const handleSignup = async (values) => {
    setErr('')
		console.log(values.username);
		console.log(values.password);
  };

  return (
    <div className="signup">
			<div>
				{err==='' ? <p></p> : <p className="failed-signup">The username is taken. Please try again.</p>}
			</div>
			<div>
				{success===true ? <p>You have signed up successfully. Please proceed to log in.</p> : <p></p>}
			</div>

			<Form
				name="basic"
				onFinish={handleSignup}
				className="signup-form"
			>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Please input your Username!' }]}
				>
					<Input placeholder='Username' type='text'/>
				</Form.Item>

				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your Password!' }]}
				>
					<Input.Password placeholder="Password"/>
				</Form.Item>

				<Form.Item
					name="password2"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Please input your Password!'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The new password that you entered do not match!'));
							},
						}),
					]}
				>
					<Input.Password placeholder="Confirm Password"/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="signup-form-button">
						SIGN UP
					</Button>
					<Link to="/">Back to login</Link>
				</Form.Item>
			</Form>
    </div>
  );
}
  
export default Signup;