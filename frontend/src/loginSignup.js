import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import validateForm from './validation'; // 
import './loginSignup.css';

function Loginsignup() {
    const [state, setState] = useState("Login");
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
        number: "" 
    });

    const [errors, setErrors] = useState({}); 

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        const isSignup = state === "Sign Up";
        const validationErrors = validateForm(formData, isSignup);
        setErrors(validationErrors);
        return Object.keys(validationErrors).every((key) => validationErrors[key] === "");
    };
  const login = async () => {
    try{
    if (!validateForm()) return;
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://swigatto.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      navigate("/home");
    } else {
      alert(responseData.error);
    }
  }
  catch (error) {
    console.error('Fetch error in login:', error);
  }
  };

  const signup = async () => {
    try{
    if (!validateForm()) return;
    console.log("SignUp Function Executed", formData);
    let responseData;
    await fetch('https://swigatto.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      navigate("/home");
    } else {
      alert(responseData.error);
    }
    }
    catch (error) {
      console.error('Fetch error in login:', error);
    }
  };

  return (
    <div className="login-bg">
        <div className="loginsignup">
            <div className={state === "Sign Up" ? "loginsignup-container signup1-container" : "loginsignup-container login1-container"}>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" && (
                        <>
                            <input
                                name='Name'
                                value={formData.name}
                                onChange={changeHandler}
                                type="text"
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="error">{errors.name}</p>}
                            
                            <input
                                name='Number'
                                value={formData.number}
                                onChange={changeHandler}
                                type="text"
                                placeholder="Phone Number"
                            />
                            {errors.number && <p className="error">{errors.number}</p>}
                        </>
                    )}
                    <input
                        name='Email'
                        value={formData.email}
                        onChange={changeHandler}
                        type="email"
                        placeholder="Email Address"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input
                        name='Password'
                        value={formData.password}
                        onChange={changeHandler}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up" ?
                    <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
                    <p className="loginsignup-login">Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
                <div className='Terms'>
                    <p style={{ fontSize: '12px' }}>
                        By {state} you are agreeing to our Terms and Conditions
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}

export default Loginsignup;