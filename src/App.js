
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
import PaymentsAndSettlementsdetails from './containers/PaymentsAndSettlements/PaymentsAndSettlementsdetails';
import ReserveEarnings from './containers/PaymentsAndSettlements/ReserveEarnings';
import SellerEarnings from './containers/PaymentsAndSettlements/SellerEarnings';

// index.js ya App.js me likhein
import 'bootstrap/dist/css/bootstrap.min.css';
import MediaUpload from './containers/product/MediaUpload';
import 'antd/dist/reset.css';
import BrandRequest from './containers/brand/BrandRequest';
import AddComboProduct from './containers/product/AddComboProduct';
import ComboProductSelector from './containers/product/ComboProductSelector';
import SupperTicketss from './containers/communication/SupperTicketss';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/seller" element={<SellerOnboarding />} />
                <Route path="/media" element={<MediaUpload />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
                    <Route path="brand" element={<BrandRequest />} />
          <Route path="product" element={<Product />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="order" element={<Order />} />
          <Route path="payments" element={<PaymentsAndSettlements />} />
          {/* <Route path="useraccess" element ={<UserAccess/>}/> */}
          <Route path="useraccess" element={<UserAccess />} />
       <Route path="addcombo" element={<AddComboProduct />} />
         <Route path="editcombo/:id" element={<ComboProductSelector />} />

          <Route path="/reviews" element={<ReviewManagement />} />
          <Route path="/product/:id" element={<ProductDetails />} />
                   <Route path="reserved" element={<ReserveEarnings />} />
        <Route path="sellerearning" element={<SellerEarnings />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/payments/details/:orderId" element={<PaymentsAndSettlementsdetails />} />
          <Route path="/compliance/gst-reports" element={<GSTReports />} />
          <Route path="/compliance/tax" element={<TaxCompliance />} />
          <Route path="/compliance/policies" element={<BusinessPolicies />} />
          <Route path="/compliance/refund-policy" element={<RefundPolicy />} />
          <Route path="/communication/in-app" element={<InAppMessaging />} />
          <Route path="/communication/support" element={<SupperTicketss />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

// App.jsx
// import React, { useState } from 'react';

// const App = () => {
//   const [userInput, setUserInput] = useState("");
//   const [allInput, setAllInput] = useState([]);
//   const [displayList, setDisplayList] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const updateDisplayList = (list = allInput, currentFilter = filter, currentSearch = searchQuery) => {
//     let filteredList = list;

//     if (currentFilter === "completed") {
//       filteredList = filteredList.filter(item => item.completed);
//     } else if (currentFilter === "incomplete") {
//       filteredList = filteredList.filter(item => !item.completed);
//     }

//     if (currentSearch.trim() !== "") {
//       filteredList = filteredList.filter(item =>
//         item.text.toLowerCase().includes(currentSearch.toLowerCase())
//       );
//     }

//     setDisplayList(filteredList);
//   };

//   const addInputUserData = () => {
//     if (userInput.trim() === "") return;

//     const itemAlreadyExists = allInput.find(
//       (item) => item.text.toLowerCase() === userInput.trim().toLowerCase()
//     );
//     if (itemAlreadyExists) {
//       alert("This item already exists");
//       return;
//     }

//     const newList = [...allInput, { text: userInput.trim(), completed: false }];
//     setAllInput(newList);
//     updateDisplayList(newList);
//     setUserInput("");
//   };

//   const editButton = (index) => {
//     setEditIndex(index);
//     setUserInput(allInput[index].text);
//   };

//   const saveEditData = () => {
//     if (userInput.trim() === "") return;

//     const itemAlreadyExists = allInput.find(
//       (item, idx) =>
//         item.text.toLowerCase() === userInput.trim().toLowerCase() && idx !== editIndex
//     );
//     if (itemAlreadyExists) {
//       alert("This item already exists");
//       return;
//     }

//     const updatedList = [...allInput];
//     updatedList[editIndex].text = userInput.trim();
//     setAllInput(updatedList);
//     updateDisplayList(updatedList);
//     setUserInput("");
//     setEditIndex(null);
//   };

//   const deleteItem = (index) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete?");
//     if (isConfirmed) {
//       const updatedList = allInput.filter((_, i) => i !== index);
//       setAllInput(updatedList);
//       updateDisplayList(updatedList);
//     }
//   };

//   const handleToggleChange = (index) => {
//     const updatedList = allInput.map((item, i) =>
//       i === index ? { ...item, completed: !item.completed } : item
//     );
//     setAllInput(updatedList);
//     updateDisplayList(updatedList);
//   };

//   const handleDropItem = (e) => {
//     const selected = e.target.value.toLowerCase();
//     setFilter(selected);
//     updateDisplayList(allInput, selected, searchQuery);
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     updateDisplayList(allInput, filter, value);
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "auto" }}>
//       <h2>Todo App</h2>

//       {/* Search and Filter */}
//       <input
//         type="text"
//         placeholder="Search tasks..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//         style={{ marginRight: "10px", padding: "5px" }}
//       />

//       <select onChange={handleDropItem} value={filter} style={{ padding: "5px" }}>
//         <option value="all">All</option>
//         <option value="completed">Completed</option>
//         <option value="incomplete">Incomplete</option>
//       </select>

//       <br /><br />

//       {/* Input & Add/Edit */}
//       <input
//         type="text"
//         placeholder="Enter a task"
//         onChange={(e) => setUserInput(e.target.value)}
//         value={userInput}
//         style={{ padding: "5px", width: "70%" }}
//       />
//       {editIndex === null ? (
//         <button onClick={addInputUserData} style={{ padding: "5px", marginLeft: "10px" }}>Add</button>
//       ) : (
//         <button onClick={saveEditData} style={{ padding: "5px", marginLeft: "10px" }}>Save</button>
//       )}

//       {/* Task List */}
//       <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
//         {displayList.map((item, index) => (
//           <li
//             key={index}
//             style={{
//               textDecoration: item.completed ? "line-through" : "none",
//               color: item.completed ? "gray" : "black",
//               marginBottom: "10px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between"
//             }}
//           >
//             <div style={{ flex: 1 }}>
//               <input
//                 type="checkbox"
//                 checked={item.completed}
//                 onChange={() => handleToggleChange(allInput.indexOf(item))}
//                 style={{ marginRight: "10px" }}
//               />
//               {item.text}
//             </div>
//             <div>
//               <button onClick={() => editButton(allInput.indexOf(item))} style={{ marginRight: "5px" }}>Edit</button>
//               <button onClick={() => deleteItem(allInput.indexOf(item))}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
// import React from 'react'
// import AddEdit from './containers/task/AddEdit'
// import Task from './containers/task/Task'

// const App = () => {
//   return (
//     <div><Task/></div>
//   )
// }

// export default App