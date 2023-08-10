import React, {useEffect, useState} from 'react';
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from '../components/Spinner';
const Register = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false);


    //From submit
    const submitHandler = async(values) => {
        try {
            setLoading(true);
            await axios.post("/users/register",values);
            message.success("Registration Successfull");
            navigate("/login");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("Registration failed")
        }
    }

    //prevent login user 
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])
  return (
    <>
        <div className="register-page">
            {loading && <Spinner/>}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1>Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                
                <div className="d-flex justify-content-between">
                    <Link to="/login">Already Register ? Click Here To Login </Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Register