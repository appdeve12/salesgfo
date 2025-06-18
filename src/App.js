
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'antd/dist/reset.css';
import Login from './containers/login/Login';
import Signup from './containers/signup/Signup';
import ForgotPassword from './containers/forgetpassword/ForgetPassword';
import SellerOnboarding from './containers/sellerOnboarding/SellerOnboarding';
import Home from './containers/home/Home';
import DashboardLayout from './containers/dashboard/layout/Layout';
import Profile from './containers/profile/Profile';
import Product from './containers/product/Product';
import AddProduct from './containers/product/AddProduct';
import EditProduct from './containers/product/EditProduct';
import Order from './containers/order/order';
import "../src/App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/seller" element={<SellerOnboarding />} />
                <Route path="/" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
            <Route path="product" element={<Product />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="edit" element ={<EditProduct/>}/>
                                <Route path="order" element ={<Order/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
