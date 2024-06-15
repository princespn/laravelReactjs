import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [item, setItem] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use the correct hook name

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', item);
            if (response.data.status) {
               // alert('Login successful!');

                setErrorMessage('Login successful!');
            
                localStorage.setItem('token', response.data.token);
              
                navigate("/dashboard"); // Use navigate instead of history.push
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">Please fill in the fields below.</div>
                <div className="card-body">
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Please Enter E-mail"
                                value={item.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Please Enter Password"
                                value={item.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
