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

        <div class="d-flex align-items-center py-4">
        <main class="form-signin w-100 m-auto text-center">
   
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      

        <div class="form-floating">


       
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
        </main>
        </div>
    );
};

export default LoginPage;
