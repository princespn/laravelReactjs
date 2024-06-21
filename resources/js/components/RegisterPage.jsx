import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [item, setItem] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const navigate = useNavigate(); // Use the correct hook name
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', item);
            if (response.data.status) {
                setErrorMessage('Registration successful!.');
               /// alert('Registration successful!');
                navigate("/login"); // Use navigate instead of history.push
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div class="d-flex align-items-center py-4">
        <div class="form-signin w-100 m-auto text-center">
          <h1 class="h3 mb-3 fw-normal">Sign up for free</h1>

     
                <div className="card-body">
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                value={item.name}
                                onChange={handleChange}
                                className="form-control"
                                name="name"
                                placeholder="Please Enter Name"
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                value={item.phone}
                                onChange={handleChange}
                                className="form-control"
                                name="phone"
                                placeholder="Please Enter Phone"
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                value={item.email}
                                onChange={handleChange}
                                className="form-control"
                                name="email"
                                placeholder="Please Enter E-mail"
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                value={item.password}
                                onChange={handleChange}
                                className="form-control"
                                name="password"
                                placeholder="Please Enter Password"
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                value={item.password_confirmation}
                                onChange={handleChange}
                                className="form-control"
                                name="password_confirmation"
                                placeholder="Please Enter Confirm Password"
                                required
                            />
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
