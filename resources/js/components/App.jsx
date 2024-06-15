import React from "react";
import Router from "../router/Index";
import { NavLink } from "react-router-dom";



const App = () => {
    return (
    
           <div>         
            <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                 <ul class="nav navbar-nav">
                            <li class="navbar-brand">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li class="navbar-brand">
                                <NavLink to="/about">Aboutus</NavLink>
                            </li>
                            <li class="navbar-brand">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                     
                            <li class="navbar-brand">
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li class="navbar-brand">
                                <NavLink to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li class="navbar-brand">
                                <NavLink to="/products">Products</NavLink>
                            </li>
                     
                        </ul>
                    </div>
                    </div>
                </nav>
            
                <div class="container">
                <Router></Router>
                </div>
                </div>
 
    );
};

export default App;
