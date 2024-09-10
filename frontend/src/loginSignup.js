import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './loginSignup.css';

function Loginsignup() {
  const [state, setState] = useState("Login");
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (formData.email === "") {
      validationErrors.email = "Email should not be empty";
    } else if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Email didn't match";
    } else {
      validationErrors.email = "";
    }

    if (formData.password === "") {
      validationErrors.password = "Password should not be empty";
    } else if (!passwordPattern.test(formData.password)) {
      validationErrors.password = "Password should have at least one digit, one lowercase letter, one uppercase letter, and be a minimum of 8 characters long, without special characters.";
    } else {
      validationErrors.password = "";
    }

    if (state === "Sign Up" && formData.username === "") {
      validationErrors.username = "Please enter your name.";
    } else {
      validationErrors.username = "";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).every((key) => validationErrors[key] === "");
  };

  const login = async () => {
    if (!validateForm()) return;
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://clippic.onrender.com/login', {
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
  };

  const signup = async () => {
    if (!validateForm()) return;
    console.log("SignUp Function Executed", formData);
    let responseData;
    await fetch('https://clippic.onrender.com/signup', {
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
  };

  return (
    <div className="login-bg">
      <div className="loginsignup">
        <div className={state === "Sign Up" ? "loginsignup-container signup1-container" : "loginsignup-container login1-container"}>
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Sign Up" && (
              <input
                name='username'
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Your Name"
              />
            )}
            {errors.username && <p className="error">{errors.username}</p>}
            <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              name='password'
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
