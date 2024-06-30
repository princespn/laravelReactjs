import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Routes, Route } from 'react-router-dom';
//import Home from '../components/HomePage';
import About from '../components/AboutusPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import { DashboardPage } from '../components/DashboardPage';
import { ProductPage } from '../components/ProductPage';
import { LogoutPage } from '../components/LogoutPage';
import { CategoriesPage } from '../components/CategoriesPage';




const Index = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LoginPage/>}>Home</Route>
        <Route path="/about" element={<About/>}>Aboutus</Route>
        <Route path='/login' element={<LoginPage/>}>Login</Route>
        <Route path='/register' element={<RegisterPage/>}>Registeration</Route>
        <Route path='/dashboard' element={<DashboardPage/>}>dashboard</Route>
        <Route path='/products' element={<ProductPage/>}>Products</Route>
        <Route path='/categories' element={<CategoriesPage/>}>Categories</Route>
        <Route path='/logout' element={<LogoutPage/>}>Logout</Route>
        
        
        </Routes> 
      
         
  )
}

export default Index
