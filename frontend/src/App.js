import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwiggatoApp from "./project/home";
import Cart1 from "./project/cart";
import PaymentForm from "./project/payment";
import Loginsignup from "./project/LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginsignup />}/>
        <Route path='/home' element={<SwiggatoApp />} />
        <Route path='/cart' element={<Cart1 />} />
        <Route path='/payment' element={<PaymentForm />} />
        {/* <Route path='/' element={<SwiggatoApp />} />
        <Route path='signup/' element={<Signup />} />
        <Route path='/project/LoginSignup' element={<Loginsignup />} /> */}
        
      </Routes>
    </BrowserRouter>
  )
}

export default App