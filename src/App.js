
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
import PaymentsAndSettlements from './containers/PaymentsAndSettlements/PaymentsAndSettlements';
import ReviewManagement from './containers/reviewManagement/ReviewManagement';
import UserAccess from './containers/userAccess/UserAccess';
import ProductDetails from './containers/product/ProductDetails';
import Sidebar from './containers/dashboard/layout/Sidebar';
import OrderDetail from './containers/order/OrderDetail';
import GSTReports from './containers/compliance/gst-reports';
import TaxCompliance from './containers/compliance/tax';
import BusinessPolicies from './containers/compliance/policies';
import RefundPolicy from './containers/compliance/refund-policy';
import InAppMessaging from './containers/communication/InAppMessaging';
import SupportTickets from './containers/communication/SupportTickets';
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
                    <Route path="edit/:id" element ={<EditProduct/>}/>
                                <Route path="order" element ={<Order/>}/>
                                      {/* <Route path="payments" element ={<PaymentsAndSettlements/>}/> */}
                                        {/* <Route path="useraccess" element ={<UserAccess/>}/> */}
                                                       {/* <Route path="useraccess" element ={<UserAccess/>}/> */}
                                      
                                      
{/* <Route path="/reviews" element={<ReviewManagement />} /> */}
<Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/orders/:orderId" element={<OrderDetail />} />
          {/* <Route path="/compliance/gst-reports" element={<GSTReports />} />
  <Route path="/compliance/tax" element={<TaxCompliance />} />
  <Route path="/compliance/policies" element={<BusinessPolicies />} />
  <Route path="/compliance/refund-policy" element={<RefundPolicy />} />
   <Route path="/communication/in-app" element={<InAppMessaging />} />
    <Route path="/communication/support" element={<SupportTickets />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
